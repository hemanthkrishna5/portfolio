"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistReading = persistReading;
exports.getDatabasePath = getDatabasePath;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const DATABASE_FILENAME = process.env.MQTT_DATABASE_FILE ?? "timesheet_device.db";
const DATABASE_PATH = node_path_1.default.resolve(__dirname, "../../data", DATABASE_FILENAME);
node_fs_1.default.mkdirSync(node_path_1.default.dirname(DATABASE_PATH), { recursive: true });
const db = new better_sqlite3_1.default(DATABASE_PATH);
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
function persistReading({ topic, parsed, classification, receivedAtIso }) {
    insertStatement.run(topic, parsed.timestampText, parsed.timestampIso ?? null, classification.side ?? null, classification.confident ? 1 : 0, classification.distance ?? null, parsed.ax[0], parsed.ax[1], parsed.ax[2], parsed.gy[0], parsed.gy[1], parsed.gy[2], parsed.raw, receivedAtIso);
}
function getDatabasePath() {
    return DATABASE_PATH;
}
