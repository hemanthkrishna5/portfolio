/// <reference path="./types/sqljs.d.ts" />
import express, { Request, Response, NextFunction } from 'express';
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import http from 'http';

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
const INGEST_API_KEY = process.env.INGEST_API_KEY || ''; // for HAE posts

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

function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  if (!INGEST_API_KEY) return res.status(500).send('Server missing INGEST_API_KEY');
  const hdr = req.headers['x-api-key'] || req.query.key;
  if (hdr === INGEST_API_KEY || `${hdr}` === INGEST_API_KEY) return next();
  return res.status(401).send('Invalid or missing API key');
}

async function loadDb() {
  let buf = new Uint8Array();
  if (fs.existsSync(DB_FILE)) buf = fs.readFileSync(DB_FILE);
  const SQL = await initSqlJs({
    locateFile: (f: string) => `node_modules/sql.js/dist/${f}`
  });
  return new SQL.Database(buf);
}

function kJtoKcal(qty: number, units?: string) {
  return units === 'kJ' ? qty / 4.184 : qty;
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
      date: d, steps: 0, activeKcal: 0, totalKcal: 0,
      workoutCount: 0, workoutMinutes: 0, workoutNames: [],
    };
    prev.steps = steps;
    prev.totalKcal = prev.activeKcal + 1745;
    dayMap.set(d, prev);
    saveDay(d, prev);
  }

  function upsertActiveKcal(d: string, qty: number, units?: string) {
    const prev = dayMap.get(d) || {
      date: d, steps: 0, activeKcal: 0, totalKcal: 0,
      workoutCount: 0, workoutMinutes: 0, workoutNames: [],
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
    prev.totalKcal = prev.activeKcal + 1745;
    if (w.name) prev.workoutNames = [...new Set([...(prev.workoutNames || []), w.name])];
    dayMap.set(d, prev);
    saveDay(d, prev);
  }

  const app = express();

  // small log
  app.use((req, _res, next) => { console.log(`→ ${req.method} ${req.url}`); next(); });
  app.use(express.json({ limit: '100mb' }));

  // ------------- PUBLIC API for Health Auto Export (API key based) -------------
  // Accepts JSON exactly as HAE documents it: { "data": { "metrics": [...], "workouts": [...] } }
  app.post('/hae', apiKeyAuth, (req: Request, res: Response) => {
    const payload = req.body?.data || {};
    const metrics: any[] = payload.metrics || [];
    const workouts: any[] = payload.workouts || [];

    metrics.forEach((m: any) => {
      const { name, units, data = [] } = m || {};
      if (name === 'step_count') {
        data.forEach((r: any) => upsertSteps((r.date || '').split(' ')[0], Math.round(r.qty || 0)));
      }
      if (name === 'active_energy') {
        data.forEach((r: any) => upsertActiveKcal((r.date || '').split(' ')[0], r.qty || 0, units));
      }
    });

    workouts.forEach((w: any) => upsertWorkout(w));
    res.sendStatus(200);
  });

  // ------------- Back-compat endpoints (still protected if you want) -------------
  // If you prefer, remove basicAuth on these to allow unauthenticated posts from the phone.
  // Here we allow API key OR Basic Auth for flexibility.
  function eitherAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers['x-api-key'] || req.query.key) return apiKeyAuth(req, res, next);
    return basicAuth(req, res, next);
    }

  app.post('/steps', eitherAuth, (req, res) => {
    (req.body?.data?.metrics || []).forEach((m: any) => {
      if (m.name === 'step_count') {
        (m.data || []).forEach((r: any) =>
          upsertSteps((r.date || '').split(' ')[0], Math.round(r.qty || 0)));
      }
      if (m.name === 'active_energy') {
        (m.data || []).forEach((r: any) =>
          upsertActiveKcal((r.date || '').split(' ')[0], r.qty || 0, m.units));
      }
    });
    res.sendStatus(200);
  });

  app.post('/workouts', eitherAuth, (req, res) => {
    const list = req.body?.data?.workouts;
    if (!Array.isArray(list)) return res.status(400).send('Invalid workout payload');
    list.forEach(upsertWorkout);
    res.sendStatus(200);
  });

  // ------------------- Dashboard + API (Basic Auth) -------------------
  app.use('/api', basicAuth);
  app.get('/api/daily', (_req, res) => {
    const data = [...dayMap.values()].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    res.json(data);
  });

  // static site & dashboard (protected)
  app.use('/', basicAuth, express.static(PUBLIC_DIR));
  app.get('/', basicAuth, (_req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'dashboard.html'));
  });

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(`🔑 Basic auth user: ${BASIC_USER}`);
    console.log(`🔑 Basic auth password: ${BASIC_PASSWORD || '(empty!)'}`);
    if (INGEST_API_KEY) console.log(`🔑 Ingest API key set (X-API-Key)`);
  });
})();