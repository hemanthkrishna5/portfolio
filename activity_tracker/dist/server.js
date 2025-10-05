"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types/sqljs.d.ts" />
const express_1 = __importDefault(require("express"));
const sql_js_1 = __importDefault(require("sql.js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// File logging removed (no longer needed)
// Debug payload logging removed
// (temporary file logging removed)
// Aggregate step samples (possibly many per day) into daily totals
function aggregateStepTotals(list) {
    const m = new Map();
    (list || []).forEach((r) => {
        const d = (r?.date || '').split(' ')[0];
        if (!d)
            return;
        const n = Number(r?.qty);
        if (!Number.isFinite(n))
            return;
        const qty = Math.round(n);
        m.set(d, (m.get(d) || 0) + qty);
    });
    return m;
}
// Aggregate active energy samples per date (converted to kcal)
function aggregateEnergyTotals(list, units) {
    const m = new Map();
    (list || []).forEach((r) => {
        const d = (r?.date || '').split(' ')[0];
        if (!d)
            return;
        const q = Number(r?.qty);
        if (!Number.isFinite(q))
            return;
        const kcal = kJtoKcal(q, units);
        m.set(d, (m.get(d) || 0) + kcal);
    });
    return m;
}
// Aggregate exercise time samples per date to minutes
function aggregateExerciseMinutes(list, units) {
    const m = new Map();
    (list || []).forEach((r) => {
        const d = (r?.date || '').split(' ')[0];
        if (!d)
            return;
        const q = Number(r?.qty);
        if (!Number.isFinite(q))
            return;
        let mins = q;
        const u = (units || r?.units || '').toString().toLowerCase();
        if (u === 's' || u === 'sec' || u === 'second' || u === 'seconds')
            mins = q / 60;
        if (u === 'ms' || u === 'millisecond' || u === 'milliseconds')
            mins = q / 60000;
        // if units are 'min' or 'minutes', keep as-is
        m.set(d, (m.get(d) || 0) + mins);
    });
    return m;
}
// Aggregate workouts into per-day totals and de-dupe by workout id
function aggregateWorkoutsByDate(workouts) {
    const map = new Map();
    (workouts || []).forEach((w) => {
        const d = (w?.start || '').split(' ')[0];
        if (!d)
            return;
        let acc = map.get(d);
        if (!acc) {
            acc = { minutes: 0, count: 0, names: new Set(), kcal: 0, ids: new Set() };
            map.set(d, acc);
        }
        const id = String(w?.id || `${w?.start}-${w?.name || ''}`);
        if (acc.ids.has(id))
            return; // skip duplicates within same payload
        acc.ids.add(id);
        // minutes
        let mins = 0;
        if (typeof w?.duration === 'number' && isFinite(w.duration))
            mins = w.duration / 60;
        else if (w?.start && w?.end) {
            const t0 = Date.parse(w.start);
            const t1 = Date.parse(w.end);
            if (isFinite(t0) && isFinite(t1) && t1 > t0)
                mins = (t1 - t0) / 60000;
        }
        acc.minutes += mins;
        // kcal
        if (w?.activeEnergyBurned && typeof w.activeEnergyBurned.qty === 'number') {
            acc.kcal += kJtoKcal(w.activeEnergyBurned.qty, w.activeEnergyBurned.units);
        }
        else if (Array.isArray(w?.activeEnergy)) {
            acc.kcal += (w.activeEnergy || []).reduce((s, r) => {
                const q = Number(r?.qty);
                if (!Number.isFinite(q))
                    return s;
                return s + kJtoKcal(q, r?.units);
            }, 0);
        }
        // count + names
        acc.count += 1;
        if (w?.name)
            acc.names.add(String(w.name));
    });
    return map;
}
const ROOT = process.cwd();
const PUBLIC_DIR = path_1.default.resolve(ROOT, 'public');
const DB_FILE = path_1.default.resolve(ROOT, 'activity_data.sqlite');
const PORT = Number(process.env.PORT || 4000);
const BASIC_USER = process.env.BASIC_USER || 'hemanth';
let BASIC_PASSWORD = process.env.BASIC_PASSWORD || 'anisha334';
function resolvePassword() {
    if (process.env.BASIC_PASSWORD && process.env.BASIC_PASSWORD.length > 0) {
        BASIC_PASSWORD = process.env.BASIC_PASSWORD;
        console.log('🔒 Basic-Auth password (from env).');
    }
    else {
        BASIC_PASSWORD = 'anisha334';
        console.log('🔒 Basic-Auth password (default).');
    }
}
function basicAuth(req, res, next) {
    if (req.method === 'OPTIONS')
        return next();
    const header = req.headers.authorization || '';
    const expected = 'Basic ' + Buffer.from(`${BASIC_USER}:${BASIC_PASSWORD}`).toString('base64');
    if (header === expected)
        return next();
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
    return res.status(401).send('Auth required');
}
async function loadDb() {
    let buf = new Uint8Array();
    if (fs_1.default.existsSync(DB_FILE))
        buf = fs_1.default.readFileSync(DB_FILE);
    const SQL = await (0, sql_js_1.default)({
        locateFile: (f) => `node_modules/sql.js/dist/${f}`,
    });
    return new SQL.Database(buf);
}
function kJtoKcal(qty, units) {
    return units === 'kJ' ? qty / 4.184 : qty;
}
function isSteps(name) {
    const n = (name || '').trim();
    return ['step_count', 'stepCount', 'HKQuantityTypeIdentifierStepCount'].includes(n);
}
function isActiveEnergy(name) {
    const n = (name || '').trim();
    return [
        'active_energy',
        'activeEnergyBurned',
        'HKQuantityTypeIdentifierActiveEnergyBurned',
    ].includes(n);
}
function isExerciseMinutes(name) {
    const n = (name || '').trim();
    return [
        'apple_exercise_time',
        'exercise_time',
        'exerciseTime',
        'HKQuantityTypeIdentifierAppleExerciseTime',
    ].includes(n);
}
// Helpers: local ISO date and week bounds (Mon → Sun)
function isoLocal(d) {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
}
function weekBounds(today = new Date(), offsetWeeks = 0) {
    const reference = new Date(today);
    if (offsetWeeks)
        reference.setDate(reference.getDate() + offsetWeeks * 7);
    const dow = reference.getDay();
    const deltaToMon = dow === 0 ? -6 : 1 - dow;
    const start = new Date(reference);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() + deltaToMon);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: isoLocal(start), end: isoLocal(end) };
}
(async function main() {
    resolvePassword();
    const db = await loadDb();
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
    const dayMap = new Map();
    const res0 = db.exec('SELECT * FROM day_stats;');
    if (res0.length) {
        const { columns, values } = res0[0];
        values.forEach((row) => {
            const rec = {};
            columns.forEach((col, i) => (rec[col] = row[i]));
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
    function saveDay(d, s) {
        const names = s.workoutNames.join(',');
        db.run(`
      INSERT INTO day_stats
        (date,steps,activeKcal,workoutCount,workoutMinutes,workoutNames)
      VALUES (?,?,?,?,?,?)
      ON CONFLICT(date) DO UPDATE SET
        steps=excluded.steps,
        activeKcal=excluded.activeKcal,
        workoutCount=excluded.workoutCount,
        workoutMinutes=excluded.workoutMinutes,
        workoutNames=excluded.workoutNames;
    `, [d, s.steps, s.activeKcal, s.workoutCount, s.workoutMinutes, names]);
        fs_1.default.writeFileSync(DB_FILE, Buffer.from(db.export()));
    }
    function upsertSteps(d, steps) {
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
    function upsertActiveKcal(d, qty, units) {
        const prev = dayMap.get(d) || {
            date: d,
            steps: 0,
            activeKcal: 0,
            totalKcal: 0,
            workoutCount: 0,
            workoutMinutes: 0,
            workoutNames: [],
        };
        // Set, don't add — idempotent per-day total (rounded like Move ring)
        prev.activeKcal = Math.round(kJtoKcal(qty, units));
        prev.totalKcal = prev.activeKcal + 1745;
        dayMap.set(d, prev);
        saveDay(d, prev);
    }
    function upsertWorkout(w) {
        const d = (w.start || '').split(' ')[0] || 'unknown';
        const prev = dayMap.get(d) || {
            date: d, steps: 0, activeKcal: 0, totalKcal: 0,
            workoutCount: 0, workoutMinutes: 0, workoutNames: [],
        };
        prev.workoutCount += 1;
        if (w.name) {
            prev.workoutNames = [...new Set([...(prev.workoutNames || []), w.name])];
        }
        prev.totalKcal = prev.activeKcal + 1745;
        dayMap.set(d, prev);
        saveDay(d, prev);
    }
    const app = (0, express_1.default)();
    // tiny log
    app.use((req, _res, next) => {
        console.log(`→ ${req.method} ${req.url}`);
        next();
    });
    // big payloads + urlencoded
    app.use(express_1.default.json({ limit: '500mb', inflate: true, type: 'application/json' }));
    app.use(express_1.default.urlencoded({ limit: '500mb', extended: true }));
    // 413 handler (for body too large)
    app.use((err, _req, res, next) => {
        if (err?.type === 'entity.too.large' || err?.status === 413) {
            return res.status(413).send('Payload too large');
        }
        next(err);
    });
    // ---------------- WRITE (protected) ----------------
    // Health Auto Export endpoint (expects: { data: { metrics: [...], workouts: [...] } })
    app.post('/hae', basicAuth, (req, res) => {
        const payload = req.body?.data || {};
        const metrics = payload.metrics || [];
        const workouts = payload.workouts || [];
        // Track which dates explicitly provide exercise minutes metric in this payload
        const exerciseDates = new Set();
        metrics.forEach((m) => {
            const { name, identifier, units, data = [] } = m || {};
            const key = identifier || name;
            if (isSteps(key)) {
                // Sum all samples per date, then set daily total once
                const totals = aggregateStepTotals(data);
                totals.forEach((total, d) => upsertSteps(d, total));
            }
            if (isActiveEnergy(key)) {
                const energy = aggregateEnergyTotals(data, units);
                energy.forEach((totalKcal, d) => upsertActiveKcal(d, totalKcal, 'kcal'));
            }
            if (isExerciseMinutes(key)) {
                const mins = aggregateExerciseMinutes(data, units);
                mins.forEach((minutes, d) => {
                    exerciseDates.add(d);
                    const prev = dayMap.get(d) || {
                        date: d,
                        steps: 0,
                        activeKcal: 0,
                        totalKcal: 0,
                        workoutCount: 0,
                        workoutMinutes: 0,
                        workoutNames: [],
                    };
                    prev.workoutMinutes = Math.round(minutes);
                    prev.totalKcal = prev.activeKcal + 1745;
                    dayMap.set(d, prev);
                    saveDay(d, prev);
                });
            }
        });
        // Aggregate workouts per day (names + count only; no minutes/kcal from workouts)
        const byDate = aggregateWorkoutsByDate(workouts);
        byDate.forEach((acc, d) => {
            const prev = dayMap.get(d) || {
                date: d,
                steps: 0,
                activeKcal: 0,
                totalKcal: 0,
                workoutCount: 0,
                workoutMinutes: 0,
                workoutNames: [],
            };
            prev.workoutCount = acc.count;
            // Do not set minutes or activeKcal from workouts
            prev.totalKcal = prev.activeKcal + 1745;
            prev.workoutNames = Array.from(new Set([...(prev.workoutNames || []), ...acc.names]));
            dayMap.set(d, prev);
            saveDay(d, prev);
        });
        res.sendStatus(200);
    });
    app.post('/steps', basicAuth, (req, res) => {
        (req.body?.data?.metrics || []).forEach((m) => {
            const key = m.identifier || m.name;
            if (isSteps(key)) {
                // Sum all samples per date, then set daily total once
                const totals = aggregateStepTotals(m.data || []);
                totals.forEach((total, d) => upsertSteps(d, total));
            }
            if (isActiveEnergy(key)) {
                const energy = aggregateEnergyTotals(m.data || [], m.units);
                energy.forEach((totalKcal, d) => upsertActiveKcal(d, totalKcal, 'kcal'));
            }
            if (isExerciseMinutes(key)) {
                const mins = aggregateExerciseMinutes(m.data || [], m.units);
                mins.forEach((minutes, d) => {
                    const prev = dayMap.get(d) || {
                        date: d,
                        steps: 0,
                        activeKcal: 0,
                        totalKcal: 0,
                        workoutCount: 0,
                        workoutMinutes: 0,
                        workoutNames: [],
                    };
                    prev.workoutMinutes = Math.round(minutes);
                    prev.totalKcal = prev.activeKcal + 1745;
                    dayMap.set(d, prev);
                    saveDay(d, prev);
                });
            }
        });
        res.sendStatus(200);
    });
    app.post('/workouts', basicAuth, (req, res) => {
        const list = req.body?.data?.workouts;
        if (!Array.isArray(list))
            return res.status(400).send('Invalid workout payload');
        const byDate = aggregateWorkoutsByDate(list);
        byDate.forEach((acc, d) => {
            const prev = dayMap.get(d) || {
                date: d,
                steps: 0,
                activeKcal: 0,
                totalKcal: 0,
                workoutCount: 0,
                workoutMinutes: 0,
                workoutNames: [],
            };
            prev.workoutCount = acc.count;
            // Do not set minutes or activeKcal from workouts
            prev.totalKcal = prev.activeKcal + 1745;
            prev.workoutNames = Array.from(new Set([...(prev.workoutNames || []), ...acc.names]));
            dayMap.set(d, prev);
            saveDay(d, prev);
        });
        res.sendStatus(200);
    });
    // CORS-enabled compact summary (remains public for the external site)
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
            const currentWeek = weekBounds(new Date());
            const previousWeek = weekBounds(new Date(), -1);
            const todayRes = db.exec(`SELECT COALESCE(steps,0) FROM day_stats WHERE date='${today}' LIMIT 1;`);
            const curWeekRes = db.exec(`SELECT COALESCE(SUM(steps),0) FROM day_stats WHERE date >= '${currentWeek.start}' AND date <= '${currentWeek.end}';`);
            const prevWeekRes = db.exec(`SELECT COALESCE(SUM(steps),0) FROM day_stats WHERE date >= '${previousWeek.start}' AND date <= '${previousWeek.end}';`);
            const todaySteps = todayRes.length && todayRes[0].values.length ? Number(todayRes[0].values[0][0] || 0) : 0;
            const currentSteps = curWeekRes.length && curWeekRes[0].values.length ? Number(curWeekRes[0].values[0][0] || 0) : 0;
            const previousSteps = prevWeekRes.length && prevWeekRes[0].values.length ? Number(prevWeekRes[0].values[0][0] || 0) : 0;
            const thisWeek = { ...currentWeek, steps: currentSteps };
            const lastWeek = { ...previousWeek, steps: previousSteps };
            res.json({
                today: { date: today, steps: todaySteps },
                thisWeek,
                lastWeek,
                week: thisWeek,
            });
        }
        catch (e) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(500).json({ error: 'failed', message: String(e) });
        }
    });
    // ---------------- READ (protected) ----------------
    // Require basic auth for dashboard content and read APIs
    app.use(basicAuth);
    app.get('/api/daily', (_req, res) => {
        const data = [...dayMap.values()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        res.json(data);
    });
    app.get('/api/steps/today', (_req, res) => {
        try {
            const today = isoLocal(new Date());
            const r = db.exec(`SELECT COALESCE(steps,0) AS s FROM day_stats WHERE date='${today}' LIMIT 1;`);
            const steps = r.length && r[0].values.length ? Number(r[0].values[0][0] || 0) : 0;
            res.json({ date: today, steps });
        }
        catch (e) {
            res.status(500).json({ error: 'failed', message: String(e) });
        }
    });
    app.get('/api/steps/week', (_req, res) => {
        try {
            const currentWeek = weekBounds(new Date());
            const previousWeek = weekBounds(new Date(), -1);
            const curWeekRes = db.exec(`SELECT COALESCE(SUM(steps),0) AS total FROM day_stats WHERE date >= '${currentWeek.start}' AND date <= '${currentWeek.end}';`);
            const prevWeekRes = db.exec(`SELECT COALESCE(SUM(steps),0) AS total FROM day_stats WHERE date >= '${previousWeek.start}' AND date <= '${previousWeek.end}';`);
            const currentSteps = curWeekRes.length && curWeekRes[0].values.length ? Number(curWeekRes[0].values[0][0] || 0) : 0;
            const previousSteps = prevWeekRes.length && prevWeekRes[0].values.length ? Number(prevWeekRes[0].values[0][0] || 0) : 0;
            const thisWeek = { ...currentWeek, steps: currentSteps };
            const lastWeek = { ...previousWeek, steps: previousSteps };
            res.json({ thisWeek, lastWeek, week: thisWeek });
        }
        catch (e) {
            res.status(500).json({ error: 'failed', message: String(e) });
        }
    });
    // -------- Static site --------
    app.use('/', express_1.default.static(PUBLIC_DIR));
    app.get('/', (_req, res) => {
        res.sendFile(path_1.default.join(PUBLIC_DIR, 'dashboard.html'));
    });
    const server = app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
        console.log(`🔑 Basic auth user: ${BASIC_USER}`);
        console.log(`🔑 Basic auth password: ${BASIC_PASSWORD || '(empty!)'}`);
    });
    // longer timeouts for large uploads
    server.headersTimeout = 300000; // 5 min
    server.requestTimeout = 300000; // 5 min
})();
