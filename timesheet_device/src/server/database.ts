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
const selectLatestStatement = db.prepare(
  "SELECT * FROM imu_readings ORDER BY id DESC LIMIT 1"
);

export function getLatestReading(): LatestReadingPayload | null {
  const row = selectLatestStatement.get() as any;
  if (!row) {
    return null;
  }

  return {
    topic: row.topic,
    side: row.side,
    confidence: row.confidence === 1,
    distance: row.distance,
    imu_timestamp_text: row.imu_timestamp_text,
    imu_timestamp_iso: row.imu_timestamp_iso,
    received_at: row.received_at,
    raw_payload: row.raw_payload,
  };
}

// --- Helper ---
export function getDatabasePath(): string {
  return DATABASE_PATH;
}
