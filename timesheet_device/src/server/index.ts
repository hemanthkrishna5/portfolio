import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import cors from "cors";
import express from "express";
import mqtt from "mqtt";

import type { LatestReadingPayload, ParsedMessage, SideProfile } from "../shared/types.js";
import { persistReading, getDatabasePath, getLatestReading, getLatestReadingWithSegment, getReadingHistory, getAllLabels, setLabel } from "./database.js";
import { parsePayload } from "./parser.js";
import { classifyVector, loadProfiles } from "./profiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.TIMESHEET_DATA_DIR
  ? path.resolve(process.env.TIMESHEET_DATA_DIR)
  : path.resolve(__dirname, "../../data");

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL ?? "mqtt://broker.hivemq.com:1883";
const MQTT_TOPIC = process.env.MQTT_TOPIC ?? "test/Device1_status";
const HTTP_PORT = Number(process.env.PORT ?? 8080);
const REFERENCE_PATH = process.env.SIDE_REFERENCE_PATH ?? path.join(DATA_DIR, "side_reference.json");

const ELECTRONICS_HTML_PATH = process.env.ELECTRONICS_HTML_PATH ?? path.resolve(__dirname, "../../../main_website/electronics.html");
const ELECTRONICS_ROOT_DIR = path.dirname(ELECTRONICS_HTML_PATH);
const CLIENT_DIST_PATH = path.resolve(__dirname, "../../client");
const EMBED_DIST_PATH = (() => {
  const override = process.env.EMBED_DIST_PATH;
  if (!override) {
    return path.resolve(__dirname, "../../embed");
  }
  return path.isAbsolute(override) ? override : path.resolve(__dirname, override);
})();
const EMBED_ASSETS_PATH = path.join(EMBED_DIST_PATH, "assets");
const HISTORY_LIMIT_DEFAULT = Number.isFinite(Number(process.env.HISTORY_LIMIT))
  ? Number(process.env.HISTORY_LIMIT)
  : 5000;
const TOTAL_SIDES = Number.isFinite(Number(process.env.TOTAL_SIDES))
  ? Math.max(1, Number(process.env.TOTAL_SIDES))
  : 12;

const defaultLatest: LatestReadingPayload = {
  topic: null,
  side: null,
  confidence: null,
  distance: null,
  imu_timestamp_text: null,
  imu_timestamp_iso: null,
  received_at: null,
  raw_payload: null,
  segment_started_at: null
};

let latestReading: LatestReadingPayload = { ...defaultLatest };
let sideProfiles: SideProfile[] = [];
let missingProfilesWarningShown = false;
let currentSegmentStartIso: string | null = null;

function updateLatest(topic: string, parsed: ParsedMessage, receivedAtIso: string, classificationTopic: {
  side: number | null;
  confident: boolean;
  distance: number | null;
}): void {
  if (classificationTopic.side === null) {
    currentSegmentStartIso = null;
  } else if (latestReading.side !== classificationTopic.side) {
    currentSegmentStartIso = receivedAtIso;
  } else if (!currentSegmentStartIso) {
    currentSegmentStartIso = latestReading.segment_started_at ?? receivedAtIso;
  }

  latestReading = {
    topic,
    side: classificationTopic.side,
    confidence: classificationTopic.side === null ? null : classificationTopic.confident,
    distance: classificationTopic.distance,
    imu_timestamp_text: parsed.timestampText,
    imu_timestamp_iso: parsed.timestampIso ?? null,
    received_at: receivedAtIso,
    raw_payload: parsed.raw,
    segment_started_at: currentSegmentStartIso
  };
}

function getLatest(): LatestReadingPayload {
  return { ...latestReading };
}

function ensureProfilesLoaded(): void {
  if (sideProfiles.length === 0 && !missingProfilesWarningShown) {
    console.warn("[profiles] No side profiles available for classification. Set SIDE_REFERENCE_PATH or create data/side_reference.json.");
    missingProfilesWarningShown = true;
  }
}

function startHttpServer(): void {
  const app = express();
  app.use(( _request, response, next) => {
    response.removeHeader("X-Frame-Options");
    response.setHeader(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://tesseract.sbs https://www.tesseract.sbs"
    );
    next();
  });
  app.use(cors());
  app.use(express.json());

  const embedAvailable = fs.existsSync(EMBED_DIST_PATH);
  const embedAssetsAvailable = fs.existsSync(EMBED_ASSETS_PATH);

  if (embedAssetsAvailable) {
    app.use("/assets", express.static(EMBED_ASSETS_PATH, { fallthrough: true }));
  }

  if (embedAvailable) {
    app.get(["/vite.svg", "/robots.txt"], (request, response, next) => {
      const resolved = path.join(EMBED_DIST_PATH, request.path.slice(1));
      if (fs.existsSync(resolved)) {
        response.sendFile(resolved);
        return;
      }
      next();
    });

    app.get("/", (request, response, next) => {
      if (Object.prototype.hasOwnProperty.call(request.query, "embed")) {
        response.sendFile(path.join(EMBED_DIST_PATH, "index.html"), (error) => {
          if (error) {
            next(error);
          }
        });
        return;
      }
      next();
    });
  }

  app.get("/api/imu/latest", (_request, response) => {
    response.json(getLatest());
  });

  app.get("/api/imu/history", (request, response) => {
    const { limit: limitParam, since: sinceParam } = request.query as { limit?: string; since?: string };
    const parsedLimit = limitParam ? Number(limitParam) : undefined;
    const limit = Number.isFinite(parsedLimit) && parsedLimit! > 0 ? Math.floor(parsedLimit!) : HISTORY_LIMIT_DEFAULT;
    const sinceIso = typeof sinceParam === "string" && sinceParam.trim().length > 0 ? sinceParam.trim() : undefined;
    const history = getReadingHistory({ limit, sinceIso });
    response.json(history);
  });

  app.get("/api/labels", (_request, response) => {
    response.json({ labels: getAllLabels() });
  });

  app.put("/api/labels/:side", (request, response) => {
    const sideRaw = request.params.side;
    const side = Number.parseInt(sideRaw, 10);
    if (!Number.isFinite(side) || side < 1 || side > TOTAL_SIDES) {
      response.status(400).json({ error: "invalid_side", message: "Side must be between 1 and the configured TOTAL_SIDES" });
      return;
    }

    const labelValue = typeof request.body?.label === "string" ? request.body.label : "";

    try {
      setLabel(side, labelValue);
      const sanitized = labelValue.trim();
      response.json({ side, label: sanitized.length > 0 ? sanitized : null });
    } catch (error) {
      console.error(`[http] failed to persist label for side ${side}:`, error);
      response.status(500).json({ error: "label_persist_failed" });
    }
  });

  app.get("/healthz", (_request, response) => {
    response.json({ status: "ok" });
  });

  const clientDistExists = fs.existsSync(CLIENT_DIST_PATH);
  if (clientDistExists) {
    app.use("/timesheet-app", express.static(CLIENT_DIST_PATH));
    app.get(["/timesheet-app", "/timesheet-app/*"], (_request, response, next) => {
      response.sendFile(path.join(CLIENT_DIST_PATH, "index.html"), (error) => {
        if (error) {
          next(error);
        }
      });
    });
  }

  const electronicsHtmlExists = fs.existsSync(ELECTRONICS_HTML_PATH);
  if (electronicsHtmlExists) {
    console.log(`[http] serving electronics page from ${ELECTRONICS_HTML_PATH}`);
    app.use(express.static(ELECTRONICS_ROOT_DIR));
    app.get("*", (request, response, next) => {
      if (request.path.startsWith("/api/") || request.path.startsWith("/timesheet-app")) {
        next();
        return;
      }
      response.sendFile(ELECTRONICS_HTML_PATH);
    });
  } else if (embedAvailable) {
    console.log(`[http] serving embedded UI from ${EMBED_DIST_PATH}`);
    app.use(express.static(EMBED_DIST_PATH));
    app.get("*", (request, response, next) => {
      if (request.path.startsWith("/api/")) {
        next();
        return;
      }
      response.sendFile(path.join(EMBED_DIST_PATH, "index.html"), (error) => {
        if (error) {
          next(error);
        }
      });
    });
  } else if (clientDistExists) {
    app.use(express.static(CLIENT_DIST_PATH));
    app.get("*", (request, response, next) => {
      if (request.path.startsWith("/api/")) {
        next();
        return;
      }
      response.sendFile(path.join(CLIENT_DIST_PATH, "index.html"), (error) => {
        if (error) {
          next(error);
        }
      });
    });
  }

  app.listen(HTTP_PORT, () => {
    console.log(`[http] listening on http://0.0.0.0:${HTTP_PORT}`);
  });
}

function logClassification(parsed: ParsedMessage, classification: {
  side: number | null;
  confident: boolean;
}): void {
  const label = classification.side === null ? "Unknown" : classification.side.toString();
  const confidence = classification.side !== null && classification.confident ? " (confident)" : "";
  // console.log(`[mqtt] ${parsed.timestampText} | Side ${label}${confidence}`);
}

function startMqttClient(): void {
  ensureProfilesLoaded();
  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on("connect", () => {
    console.log(`[mqtt] connected to ${MQTT_BROKER_URL}`);
    client.subscribe(MQTT_TOPIC, (error) => {
      if (error) {
        console.error(`[mqtt] failed to subscribe to ${MQTT_TOPIC}:`, error.message);
      } else {
        console.log(`[mqtt] subscribed to ${MQTT_TOPIC}`);
      }
    });
  });

  client.on("message", (topic, payload) => {
    const rawText = payload.toString("utf-8").trim();
    if (!rawText) return;

    const parsed = parsePayload(rawText);
    if (!parsed) {
      console.warn(`[mqtt] unable to parse payload on ${topic}`);
      return;
    }

    const vector = [...parsed.ax, ...parsed.gy];
    const classification = classifyVector(vector, sideProfiles);
    const receivedAtIso = new Date().toISOString();

    try {
      persistReading({ topic, parsed, classification, receivedAtIso });
    } catch (error) {
      console.error(`[db] failed to persist reading: ${(error as Error).message}`);
    }

    updateLatest(topic, parsed, receivedAtIso, classification);
    logClassification(parsed, classification);
  });

  client.on("error", (error) => {
    console.error("[mqtt] client error", error);
  });
}

async function bootstrap(): Promise<void> {
  const { latest: initialReading, segmentStart } = getLatestReadingWithSegment();
  if (initialReading) {
    console.log("[bootstrap] starting with latest reading from database");
    latestReading = initialReading;
    currentSegmentStartIso = segmentStart ?? initialReading.segment_started_at ?? initialReading.received_at ?? null;
    latestReading.segment_started_at = currentSegmentStartIso;
  } else {
    console.log("[bootstrap] no previous reading found in database");
  }

  sideProfiles = await loadProfiles(REFERENCE_PATH);
  console.log(`[bootstrap] loaded ${sideProfiles.length} side profiles`);
  console.log(`[bootstrap] database file: ${getDatabasePath()}`);

  ensureProfilesLoaded();

  startHttpServer();
  startMqttClient();
}

bootstrap().catch((error) => {
  console.error("[bootstrap] failed to start timesheet device service", error);
  process.exitCode = 1;
});
