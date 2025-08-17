/// <reference path="./types/sqljs.d.ts" />
import express, { Request, Response, NextFunction } from 'express';
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

type DayStats = {
  date: string;
  steps: number;
  activeKcal: number;     // active kcal only
  totalKcal: number;      // activeKcal + 1745 fixed baseline
  workoutCount: number;
  workoutMinutes: number;
  workoutNames: string[];
};

const ROOT = process.cwd();
const PUBLIC_DIR = path.resolve(ROOT, 'public');
const DB_FILE = path.resolve(ROOT, 'activity_data.sqlite');
const PORT = Number(process.env.PORT || 4000);
const BASIC_USER = process.env.BASIC_USER || 'user';
let BASIC_PASSWORD = process.env.BASIC_PASSWORD || '';

async function fetchPublicIP(): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { host: 'api.ipify.org', path: '/', method: 'GET' },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(data.trim()));
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function resolvePassword() {
  if (process.env.BASIC_PASSWORD && process.env.BASIC_PASSWORD.length > 0) {
    BASIC_PASSWORD = process.env.BASIC_PASSWORD;
    console.log('🔒 Basic-Auth password (from env).');
  } else {
    try {
      BASIC_PASSWORD = await fetchPublicIP();
      console.log('🔒 Basic-Auth password (your public IP):', BASIC_PASSWORD);
    } catch {
      console.warn('⚠️ Could not fetch public IP; BASIC_PASSWORD is empty. Set BASIC_PASSWORD env.');
    }
  }
}

function basicAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const expected = 'Basic ' + Buffer.from(`${BASIC_USER}:${BASIC_PASSWORD}`).toString('base64');
  if (header === expected) return next();
  res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
  return res.status(401).send('Auth required');
}

async function loadDb() {
  let buf = new Uint8Array();
  if (fs.existsSync(DB_FILE)) buf = fs.readFileSync(DB_FILE);
  const SQL = await initSqlJs({
    locateFile: (f: string) => `node_modules/sql.js/dist/${f}`,
  });
  return new SQL.Database(buf);
}

function kJtoKcal(qty: number, units?: string) {
  return units === 'kJ' ? qty / 4.184 : qty;
}

function isSteps(name?: string) {
  const n = (name || '').trim();
  return ['step_count', 'stepCount', 'HKQuantityTypeIdentifierStepCount'].includes(n);
}
function isActiveEnergy(name?: string) {
  const n = (name || '').trim();
  return [
    'active_energy',
    'activeEnergyBurned',
    'HKQuantityTypeIdentifierActiveEnergyBurned',
  ].includes(n);
}

// New helper functions for local ISO date and week bounds
function isoLocal(d: Date) {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function weekBounds(today = new Date()) {
  // Monday=1 ... Sunday=0 -> convert to Monday-based index
  const dow = today.getDay();
  const deltaToMon = (dow === 0 ? -6 : 1 - dow); // how many days to go back to Monday
  const start = new Date(today);
  start.setHours(0,0,0,0);
  start.setDate(start.getDate() + deltaToMon);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start: isoLocal(start), end: isoLocal(end) };
}

(async function main() {
  await resolvePassword();
  if (!process.env.BASIC_PASSWORD) setInterval(resolvePassword, 6 * 60 * 60 * 1000);

  const db: any = await loadDb();
  db.run(`
    CREATE TABLE IF NOT EXISTS day_stats (
      date TEXT PRIMARY KEY,
      steps INTEGER,
      activeKcal REAL,
      workoutCount INTEGER,
      workoutMinutes REAL,
      workoutNames TEXT
    );
  `);

  const dayMap = new Map<string, DayStats>();
  const res0 = db.exec('SELECT * FROM day_stats;');
  if (res0.length) {
    const { columns, values } = res0[0];
    values.forEach((row: any[]) => {
      const rec: any = {};
      columns.forEach((col: string, i: number) => (rec[col] = row[i]));
      const total = (rec.activeKcal || 0) + 1745;
      dayMap.set(rec.date, {
        date: rec.date,
        steps: rec.steps || 0,
        activeKcal: rec.activeKcal || 0,
        totalKcal: total,
        workoutCount: rec.workoutCount || 0,
        workoutMinutes: rec.workoutMinutes || 0,
        workoutNames: rec.workoutNames ? rec.workoutNames.split(',') : [],
      });
    });
  }

  function saveDay(d: string, s: DayStats) {
    const names = s.workoutNames.join(',');
    db.run(
      `
      INSERT INTO day_stats
        (date,steps,activeKcal,workoutCount,workoutMinutes,workoutNames)
      VALUES (?,?,?,?,?,?)
      ON CONFLICT(date) DO UPDATE SET
        steps=excluded.steps,
        activeKcal=excluded.activeKcal,
        workoutCount=excluded.workoutCount,
        workoutMinutes=excluded.workoutMinutes,
        workoutNames=excluded.workoutNames;
    `,
      [d, s.steps, s.activeKcal, s.workoutCount, s.workoutMinutes, names]
    );
    fs.writeFileSync(DB_FILE, Buffer.from(db.export()));
  }

  function upsertSteps(d: string, steps: number) {
    const prev = dayMap.get(d) || {
      date: d,
      steps: 0,
      activeKcal: 0,
      totalKcal: 0,
      workoutCount: 0,
      workoutMinutes: 0,
      workoutNames: [],
    };
    prev.steps = steps;
    prev.totalKcal = prev.activeKcal + 1745;
    dayMap.set(d, prev);
    saveDay(d, prev);
  }

  function upsertActiveKcal(d: string, qty: number, units?: string) {
    const prev = dayMap.get(d) || {
      date: d,
      steps: 0,
      activeKcal: 0,
      totalKcal: 0,
      workoutCount: 0,
      workoutMinutes: 0,
      workoutNames: [],
    };
    prev.activeKcal += kJtoKcal(qty, units);
    prev.totalKcal = prev.activeKcal + 1745;
    dayMap.set(d, prev);
    saveDay(d, prev);
  }

  function upsertWorkout(w: any) {
    const d = (w.start || '').split(' ')[0] || 'unknown';
    const mins = (w.duration || 0) / 60;
    const kcal = w.activeEnergyBurned ? kJtoKcal(w.activeEnergyBurned.qty, w.activeEnergyBurned.units) : 0;
  
    const prev = dayMap.get(d) || {
      date: d, steps: 0, activeKcal: 0, totalKcal: 0,
      workoutCount: 0, workoutMinutes: 0, workoutNames: [],
    };
  
    prev.workoutCount += 1;
    prev.workoutMinutes += mins;
    prev.activeKcal += kcal;
  
    // 👇 Add steps only if workout has steps AND type matches
    if (
      w.steps &&
      (w.name === "Outdoor Walk" ||
       w.name === "Indoor Walk" ||
       w.name === "Running")
    ) {
      prev.steps += w.steps;
    }
  
    prev.totalKcal = prev.activeKcal + 1745;
  
    if (w.name) {
      prev.workoutNames = [...new Set([...(prev.workoutNames || []), w.name])];
    }
  
    dayMap.set(d, prev);
    saveDay(d, prev);
  }

  const app = express();

  // tiny log
  app.use((req, _res, next) => {
    console.log(`→ ${req.method} ${req.url}`);
    next();
  });

  // big payloads + urlencoded
  app.use(express.json({ limit: '500mb', inflate: true, type: 'application/json' }));
  app.use(express.urlencoded({ limit: '500mb', extended: true }));

  // 413 handler (for body too large)
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err?.type === 'entity.too.large' || err?.status === 413) {
      return res.status(413).send('Payload too large');
    }
    next(err);
  });

  // -------- Health Auto Export endpoint (Basic Auth) --------
  // Accepts: { "data": { "metrics": [...], "workouts": [...] } }
  app.post('/hae', basicAuth, (req: Request, res: Response) => {
    const payload = req.body?.data || {};
    const metrics: any[] = payload.metrics || [];
    const workouts: any[] = payload.workouts || [];

    metrics.forEach((m: any) => {
      const { name, identifier, units, data = [] } = m || {};
      const key = identifier || name;
      if (isSteps(key)) {
        data.forEach((r: any) => upsertSteps((r.date || '').split(' ')[0], Math.round(r.qty || 0)));
      }
      if (isActiveEnergy(key)) {
        data.forEach((r: any) => upsertActiveKcal((r.date || '').split(' ')[0], r.qty || 0, units));
      }
    });

    workouts.forEach((w: any) => upsertWorkout(w));
    res.sendStatus(200);
  });

  // Back-compat endpoints (keep Basic Auth)
  app.post('/steps', basicAuth, (req, res) => {
    (req.body?.data?.metrics || []).forEach((m: any) => {
      const key = m.identifier || m.name;
      if (isSteps(key)) {
        (m.data || []).forEach((r: any) =>
          upsertSteps((r.date || '').split(' ')[0], Math.round(r.qty || 0))
        );
      }
      if (isActiveEnergy(key)) {
        (m.data || []).forEach((r: any) =>
          upsertActiveKcal((r.date || '').split(' ')[0], r.qty || 0, m.units)
        );
      }
    });
    res.sendStatus(200);
  });

  app.post('/workouts', basicAuth, (req, res) => {
    const list = req.body?.data?.workouts;
    if (!Array.isArray(list)) return res.status(400).send('Invalid workout payload');
    list.forEach(upsertWorkout);
    res.sendStatus(200);
  });

  // API + dashboard (protected)
  app.use('/api', basicAuth);
  app.get('/api/daily', (_req, res) => {
    const data = [...dayMap.values()].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    res.json(data);
  });

  // New protected API endpoints querying SQLite directly
  app.get('/api/steps/today', basicAuth, (_req, res) => {
    try {
      const today = isoLocal(new Date());
      const r = db.exec(`SELECT COALESCE(steps,0) AS s FROM day_stats WHERE date='${today}' LIMIT 1;`);
      const steps = r.length && r[0].values.length ? Number(r[0].values[0][0] || 0) : 0;
      res.json({ date: today, steps });
    } catch (e) {
      res.status(500).json({ error: 'failed', message: String(e) });
    }
  });

  app.get('/api/steps/week', basicAuth, (_req, res) => {
    try {
      const { start, end } = weekBounds(new Date());
      const r = db.exec(`SELECT COALESCE(SUM(steps),0) AS total FROM day_stats WHERE date >= '${start}' AND date <= '${end}';`);
      const steps = r.length && r[0].values.length ? Number(r[0].values[0][0] || 0) : 0;
      res.json({ start, end, steps });
    } catch (e) {
      res.status(500).json({ error: 'failed', message: String(e) });
    }
  });

  // Allow CORS so the Pages site (tesseract.sbs) can read the JSON
  app.options('/public/steps', (_req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204);
  });

  app.get('/public/steps', (_req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');

      const today = isoLocal(new Date());
      const { start, end } = weekBounds(new Date());

      const r1 = db.exec(
        `SELECT COALESCE(steps,0) FROM day_stats WHERE date='${today}' LIMIT 1;`
      );
      const todaySteps =
        r1.length && r1[0].values.length ? Number(r1[0].values[0][0] || 0) : 0;

      const r2 = db.exec(
        `SELECT COALESCE(SUM(steps),0) FROM day_stats WHERE date >= '${start}' AND date <= '${end}';`
      );
      const weekSteps =
        r2.length && r2[0].values.length ? Number(r2[0].values[0][0] || 0) : 0;

      res.json({
        today: { date: today, steps: todaySteps },
        week: { start, end, steps: weekSteps },
      });
    } catch (e) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(500).json({ error: 'failed', message: String(e) });
    }
  });

  app.use('/', basicAuth, express.static(PUBLIC_DIR));
  app.get('/', basicAuth, (_req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'dashboard.html'));
  });

  const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(`🔑 Basic auth user: ${BASIC_USER}`);
    console.log(`🔑 Basic auth password: ${BASIC_PASSWORD || '(empty!)'}`);
  });

  // longer timeouts for large uploads
  (server as any).headersTimeout = 300000;  // 5 min
  (server as any).requestTimeout = 300000;  // 5 min
})();