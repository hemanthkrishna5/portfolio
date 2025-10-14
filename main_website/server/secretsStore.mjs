import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir =
  process.env.SECRETS_DATA_DIR && process.env.SECRETS_DATA_DIR.length > 0
    ? path.resolve(process.env.SECRETS_DATA_DIR)
    : path.resolve(__dirname, 'data');
const dbPath = path.join(dataDir, 'secrets-db.json');

const DEFAULT_DB_STATE = { entries: [] };

async function ensureDbFile() {
  if (!existsSync(dataDir)) {
    await fs.mkdir(dataDir, { recursive: true });
  }
  if (!existsSync(dbPath)) {
    await fs.writeFile(dbPath, JSON.stringify(DEFAULT_DB_STATE, null, 2), 'utf-8');
  }
}

async function readDb() {
  await ensureDbFile();
  const raw = await fs.readFile(dbPath, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.entries)) {
      return { ...DEFAULT_DB_STATE };
    }
    return { entries: parsed.entries };
  } catch {
    return { ...DEFAULT_DB_STATE };
  }
}

async function writeDb(data) {
  await ensureDbFile();
  const tempPath = `${dbPath}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tempPath, dbPath);
}

function sanitizeOptionalString(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const text = String(value);
  return text.trim();
}

function normalizeAnswer(value) {
  return sanitizeOptionalString(value).normalize('NFKC');
}

function hashAnswer(answer, salt) {
  const normalized = normalizeAnswer(answer);
  if (normalized.length === 0) {
    throw new Error('Answer cannot be empty');
  }
  const buffer = crypto.scryptSync(normalized, salt, 64);
  return buffer.toString('hex');
}

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function timingSafeEqual(hashA, hashB) {
  const bufferA = Buffer.from(hashA, 'hex');
  const bufferB = Buffer.from(hashB, 'hex');
  if (bufferA.length !== bufferB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufferA, bufferB);
}

function mapToSummary(entry) {
  return {
    id: entry.id,
    personName: entry.personName,
    wifiName: entry.wifiName,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  };
}

function mapToDetail(entry) {
  return {
    id: entry.id,
    personName: entry.personName,
    wifiName: entry.wifiName,
    wifiPassword: entry.wifiPassword,
    securityQuestion: entry.securityQuestion,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  };
}

export async function listSecretSummaries() {
  const db = await readDb();
  return db.entries.map(mapToSummary);
}

export async function createSecretEntry(payload) {
  const personName = sanitizeOptionalString(payload.personName);
  const wifiName = sanitizeOptionalString(payload.wifiName);
  const wifiPassword = sanitizeOptionalString(payload.wifiPassword);
  const securityQuestion = sanitizeOptionalString(payload.securityQuestion);
  const securityAnswer = normalizeAnswer(payload.securityAnswer);

  if (wifiName.length === 0) {
    throw new Error('Wi-Fi name is required');
  }
  if (wifiPassword.length === 0) {
    throw new Error('Wi-Fi password is required');
  }
  if (securityQuestion.length === 0) {
    throw new Error('Security question is required');
  }
  if (securityAnswer.length === 0) {
    throw new Error('Security answer is required');
  }

  const db = await readDb();
  const salt = generateSalt();
  const answerHash = hashAnswer(securityAnswer, salt);
  const nowIso = new Date().toISOString();

  const entry = {
    id: crypto.randomUUID(),
    personName,
    wifiName,
    wifiPassword,
    securityQuestion,
    answerSalt: salt,
    answerHash,
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  db.entries.push(entry);
  await writeDb(db);
  return mapToSummary(entry);
}

export async function getSecretQuestion(id) {
  const db = await readDb();
  const entry = db.entries.find((item) => item.id === id);
  if (!entry) {
    console.warn(`[secrets] question requested for missing id ${id}`);
    return null;
  }
  return {
    id: entry.id,
    securityQuestion: entry.securityQuestion,
  };
}

export async function verifySecretAnswer(id, answer) {
  const db = await readDb();
  const entry = db.entries.find((item) => item.id === id);
  if (!entry) {
    console.warn(`[secrets] verify requested for missing id ${id}`);
    return null;
  }
  const candidateHash = hashAnswer(answer, entry.answerSalt);
  if (!timingSafeEqual(candidateHash, entry.answerHash)) {
    return false;
  }
  return mapToDetail(entry);
}

export async function updateSecretEntry(id, payload) {
  const db = await readDb();
  const entryIndex = db.entries.findIndex((item) => item.id === id);
  if (entryIndex === -1) {
    return null;
  }
  const entry = db.entries[entryIndex];
  const { answer } = payload;
  if (!answer || normalizeAnswer(answer).length === 0) {
    throw new Error('Security answer is required for updates');
  }
  const candidateHash = hashAnswer(answer, entry.answerSalt);
  if (!timingSafeEqual(candidateHash, entry.answerHash)) {
    return false;
  }

  const personName = sanitizeOptionalString(payload.personName ?? entry.personName);
  const wifiName = sanitizeOptionalString(payload.wifiName ?? entry.wifiName);
  const wifiPassword = sanitizeOptionalString(payload.wifiPassword ?? entry.wifiPassword);
  const securityQuestion = sanitizeOptionalString(
    payload.securityQuestion ?? entry.securityQuestion,
  );

  if (wifiName.length === 0) {
    throw new Error('Wi-Fi name is required');
  }
  if (wifiPassword.length === 0) {
    throw new Error('Wi-Fi password is required');
  }
  if (securityQuestion.length === 0) {
    throw new Error('Security question is required');
  }

  entry.personName = personName;
  entry.wifiName = wifiName;
  entry.wifiPassword = wifiPassword;
  entry.securityQuestion = securityQuestion;
  entry.updatedAt = new Date().toISOString();

  if (payload.securityAnswer && normalizeAnswer(payload.securityAnswer).length > 0) {
    const salt = generateSalt();
    entry.answerSalt = salt;
    entry.answerHash = hashAnswer(payload.securityAnswer, salt);
  }

  db.entries[entryIndex] = entry;
  await writeDb(db);

  return mapToDetail(entry);
}

export async function deleteSecretEntry(id) {
  const db = await readDb();
  const nextEntries = db.entries.filter((item) => item.id !== id);
  if (nextEntries.length === db.entries.length) {
    return false;
  }
  db.entries = nextEntries;
  await writeDb(db);
  return true;
}
