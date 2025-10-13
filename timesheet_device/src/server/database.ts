import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";
import type { ClassificationResult, ParsedMessage, LatestReadingPayload } from "../shared/types.js";


// --- Fix for __dirname in ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Database path setup ---
const DATA_DIR = process.env.TIMESHEET_DATA_DIR
  ? path.resolve(process.env.TIMESHEET_DATA_DIR)
  : path.resolve(__dirname, "../../data");
const DATABASE_FILENAME = process.env.MQTT_DATABASE_FILE ?? "timesheet_device.db";
const DATABASE_PATH = path.resolve(DATA_DIR, DATABASE_FILENAME);

fs.mkdirSync(path.dirname(DATABASE_PATH), { recursive: true });

// --- SQLite setup ---
const db = new Database(DATABASE_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS imu_readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    topic TEXT,
    imu_timestamp_text TEXT,
    imu_timestamp_iso TEXT,
    side INTEGER,
    confidence INTEGER NOT NULL,
    distance REAL,
    ax_x REAL,
    ax_y REAL,
    ax_z REAL,
    gy_x REAL,
    gy_y REAL,
    gy_z REAL,
    raw_payload TEXT NOT NULL,
    received_at TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS labels (
    side INTEGER PRIMARY KEY,
    label TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS activity_log (
    date_key TEXT NOT NULL,
    label TEXT NOT NULL,
    total_ms INTEGER NOT NULL,
    side INTEGER,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (date_key, label)
  )
`);

db.exec("CREATE INDEX IF NOT EXISTS idx_imu_readings_side ON imu_readings(side)");

type PersistArgs = {
  topic: string;
  parsed: ParsedMessage;
  classification: ClassificationResult;
  receivedAtIso: string;
};

// --- Prepared insert statement ---
const insertStatement = db.prepare(`
  INSERT INTO imu_readings (
    topic,
    imu_timestamp_text,
    imu_timestamp_iso,
    side,
    confidence,
    distance,
    ax_x,
    ax_y,
    ax_z,
    gy_x,
    gy_y,
    gy_z,
    raw_payload,
    received_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// --- Persist a reading ---
export function persistReading({
  topic,
  parsed,
  classification,
  receivedAtIso,
}: PersistArgs): void {
  insertStatement.run(
    topic,
    parsed.timestampText,
    parsed.timestampIso ?? null,
    classification.side ?? null,
    classification.confident ? 1 : 0,
    classification.distance ?? null,
    parsed.ax[0],
    parsed.ax[1],
    parsed.ax[2],
    parsed.gy[0],
    parsed.gy[1],
    parsed.gy[2],
    parsed.raw,
    receivedAtIso
  );
}

// --- Get latest reading ---
const selectLatestRowStatement = db.prepare(`
  SELECT
    id,
    topic,
    imu_timestamp_text,
    imu_timestamp_iso,
    side,
    confidence,
    distance,
    ax_x,
    ax_y,
    ax_z,
    gy_x,
    gy_y,
    gy_z,
    raw_payload,
    received_at
  FROM imu_readings
  ORDER BY id DESC
  LIMIT 1
`);

const selectPreviousDifferentStatement = db.prepare(`
  SELECT id FROM imu_readings
  WHERE id < ? AND (side IS NULL OR side != ?)
  ORDER BY id DESC
  LIMIT 1
`);

const selectFirstAfterBoundaryStatement = db.prepare(`
  SELECT received_at FROM imu_readings
  WHERE id > ? AND side = ?
  ORDER BY id ASC
  LIMIT 1
`);

const selectEarliestForSideStatement = db.prepare(`
  SELECT received_at FROM imu_readings
  WHERE side = ?
  ORDER BY id ASC
  LIMIT 1
`);

type LatestRow = {
  id: number;
  topic: string | null;
  imu_timestamp_text: string | null;
  imu_timestamp_iso: string | null;
  side: number | null;
  confidence: number | null;
  distance: number | null;
  ax_x: number | null;
  ax_y: number | null;
  ax_z: number | null;
  gy_x: number | null;
  gy_y: number | null;
  gy_z: number | null;
  raw_payload: string;
  received_at: string;
};

export function getLatestReading(): LatestReadingPayload | null {
  const result = getLatestReadingWithSegment();
  return result.latest;
}

export function getLatestReadingWithSegment(): { latest: LatestReadingPayload | null; segmentStart: string | null; latestId: number | null } {
  const row = selectLatestRowStatement.get() as LatestRow | undefined;
  if (!row) {
    return { latest: null, segmentStart: null, latestId: null };
  }

  const latest: LatestReadingPayload = {
    topic: row.topic ?? null,
    side: typeof row.side === "number" ? row.side : null,
    confidence: typeof row.confidence === "number" ? row.confidence === 1 : null,
    distance: row.distance,
    imu_timestamp_text: row.imu_timestamp_text,
    imu_timestamp_iso: row.imu_timestamp_iso,
    received_at: row.received_at,
    raw_payload: row.raw_payload,
    segment_started_at: null,
  };

  if (latest.side === null) {
    return { latest, segmentStart: null, latestId: row.id };
  }

  const previousDifferent = selectPreviousDifferentStatement.get(row.id, latest.side) as { id: number } | undefined;
  let segmentStart: string | null = null;
  if (previousDifferent && typeof previousDifferent.id === "number") {
    const startRow = selectFirstAfterBoundaryStatement.get(previousDifferent.id, latest.side) as { received_at: string } | undefined;
    segmentStart = startRow?.received_at ?? row.received_at ?? null;
  } else {
    const earliest = selectEarliestForSideStatement.get(latest.side) as { received_at: string } | undefined;
    segmentStart = earliest?.received_at ?? row.received_at ?? null;
  }

  latest.segment_started_at = segmentStart;

  return { latest, segmentStart, latestId: row.id };
}

// --- Helper ---
export function getDatabasePath(): string {
  return DATABASE_PATH;
}

export type PersistedActivityLog = Record<string, Record<string, { totalMs: number; side: number | null }>>;

type ActivityLogRow = {
  date_key: string;
  label: string;
  total_ms: number;
  side: number | null;
};

const selectActivityLogStatement = db.prepare(`
  SELECT date_key, label, total_ms, side
  FROM activity_log
`);

const clearActivityLogStatement = db.prepare(`DELETE FROM activity_log`);

const upsertActivityLogStatement = db.prepare(`
  INSERT INTO activity_log (date_key, label, total_ms, side, updated_at)
  VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  ON CONFLICT(date_key, label) DO UPDATE SET
    total_ms = excluded.total_ms,
    side = excluded.side,
    updated_at = CURRENT_TIMESTAMP
`);

export function getActivityLog(): PersistedActivityLog {
  const rows = selectActivityLogStatement.all() as ActivityLogRow[];
  const result: PersistedActivityLog = {};
  for (const row of rows) {
    if (!row.date_key || !row.label) {
      continue;
    }
    const dateKey = row.date_key;
    const label = row.label;
    const totalMs = Number.isFinite(row.total_ms) && row.total_ms > 0 ? Math.floor(row.total_ms) : 0;
    const side = Number.isFinite(row.side) ? Math.floor(row.side as number) : null;
    if (totalMs <= 0 && side === null) {
      continue;
    }
    if (!result[dateKey]) {
      result[dateKey] = {};
    }
    result[dateKey]![label] = { totalMs, side };
  }
  return result;
}

const replaceActivityLogTxn = db.transaction((entries: PersistedActivityLog) => {
  clearActivityLogStatement.run();
  for (const [dateKey, perLabel] of Object.entries(entries)) {
    if (typeof dateKey !== "string" || dateKey.length === 0 || !perLabel || typeof perLabel !== "object") {
      continue;
    }
    for (const [label, payload] of Object.entries(perLabel)) {
      if (typeof label !== "string" || label.length === 0 || !payload || typeof payload !== "object") {
        continue;
      }
      const totalMsRaw = (payload as { totalMs?: unknown }).totalMs;
      const sideRaw = (payload as { side?: unknown }).side;
      const totalMs = typeof totalMsRaw === "number" && Number.isFinite(totalMsRaw) && totalMsRaw >= 0 ? Math.floor(totalMsRaw) : 0;
      const side = typeof sideRaw === "number" && Number.isFinite(sideRaw) ? Math.floor(sideRaw) : null;
      if (totalMs <= 0 && side === null) {
        continue;
      }
      upsertActivityLogStatement.run(dateKey, label, totalMs, side);
    }
  }
});

export function replaceActivityLog(entries: PersistedActivityLog): void {
  replaceActivityLogTxn(entries);
}

interface HistoryOptions {
  limit?: number;
  sinceIso?: string;
}

const baseHistoryQuery = `
  SELECT
    topic,
    imu_timestamp_text,
    imu_timestamp_iso,
    side,
    confidence,
    distance,
    raw_payload,
    received_at
  FROM imu_readings
`;

export function getReadingHistory({ limit, sinceIso }: HistoryOptions = {}): LatestReadingPayload[] {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (sinceIso) {
    clauses.push("received_at >= ?");
    params.push(sinceIso);
  }

  let sql = baseHistoryQuery;
  if (clauses.length > 0) {
    sql += ` WHERE ${clauses.join(" AND ")}`;
  }
  sql += " ORDER BY received_at ASC, id ASC";

  if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
    sql += " LIMIT ?";
    params.push(Math.floor(limit));
  }

  const statement = db.prepare(sql);
  const rows = statement.all(...params) as Array<{
    topic: string | null;
    imu_timestamp_text: string | null;
    imu_timestamp_iso: string | null;
    side: number | null;
    confidence: number | null;
    distance: number | null;
    raw_payload: string;
    received_at: string;
  }>;

  let currentSide: number | null = null;
  let segmentStart: string | null = null;

  return rows.map((row) => {
    const side = typeof row.side === "number" ? row.side : null;
    if (side === null) {
      currentSide = null;
      segmentStart = null;
    } else if (currentSide !== side) {
      currentSide = side;
      segmentStart = row.received_at ?? segmentStart;
    }

    return {
      topic: row.topic ?? null,
      side,
      confidence: row.confidence === 1,
      distance: row.distance,
      imu_timestamp_text: row.imu_timestamp_text,
      imu_timestamp_iso: row.imu_timestamp_iso,
      received_at: row.received_at,
      raw_payload: row.raw_payload,
      segment_started_at: side !== null ? segmentStart : null
    } satisfies LatestReadingPayload;
  });
}

const selectLabelsStatement = db.prepare("SELECT side, label FROM labels");
const upsertLabelStatement = db.prepare(`
  INSERT INTO labels (side, label) VALUES (?, ?)
  ON CONFLICT(side) DO UPDATE SET label = excluded.label
`);
const deleteLabelStatement = db.prepare("DELETE FROM labels WHERE side = ?");

export function getAllLabels(): Record<number, string> {
  const rows = selectLabelsStatement.all() as Array<{ side: number; label: string }>;
  const result: Record<number, string> = {};
  for (const row of rows) {
    if (typeof row.side === "number" && row.side >= 1 && Number.isFinite(row.side) && typeof row.label === "string") {
      result[row.side] = row.label;
    }
  }
  return result;
}

export function setLabel(side: number, label: string): void {
  const trimmed = label.trim();
  if (!Number.isFinite(side) || side < 1) {
    throw new Error(`Invalid side value ${side}`);
  }
  if (trimmed.length === 0) {
    deleteLabelStatement.run(side);
  } else {
    upsertLabelStatement.run(side, trimmed);
  }
}
