"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mqtt_1 = __importDefault(require("mqtt"));
const database_1 = require("./database");
const parser_1 = require("./parser");
const profiles_1 = require("./profiles");
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL ?? "mqtt://broker.hivemq.com:1883";
const MQTT_TOPIC = process.env.MQTT_TOPIC ?? "test/Device1_status";
const HTTP_PORT = Number(process.env.HTTP_PORT ?? 8080);
const REFERENCE_PATH = process.env.SIDE_REFERENCE_PATH ?? node_path_1.default.resolve(__dirname, "../../data/side_reference.json");
const ELECTRONICS_HTML_PATH = process.env.ELECTRONICS_HTML_PATH ?? node_path_1.default.resolve(__dirname, "../../../main_website/electronics.html");
const ELECTRONICS_ROOT_DIR = node_path_1.default.dirname(ELECTRONICS_HTML_PATH);
const defaultLatest = {
    topic: null,
    side: null,
    confidence: null,
    distance: null,
    imu_timestamp_text: null,
    imu_timestamp_iso: null,
    received_at: null,
    raw_payload: null
};
let latestReading = { ...defaultLatest };
let sideProfiles = [];
function updateLatest(topic, parsed, receivedAtIso, classificationTopic) {
    latestReading = {
        topic,
        side: classificationTopic.side,
        confidence: classificationTopic.side === null ? null : classificationTopic.confident,
        distance: classificationTopic.distance,
        imu_timestamp_text: parsed.timestampText,
        imu_timestamp_iso: parsed.timestampIso ?? null,
        received_at: receivedAtIso,
        raw_payload: parsed.raw
    };
}
function getLatest() {
    return { ...latestReading };
}
function ensureProfilesLoaded() {
    if (sideProfiles.length === 0) {
        throw new Error("No side profiles available for classification. Check side_reference.json");
    }
}
function startHttpServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.get("/api/imu/latest", (_request, response) => {
        response.json(getLatest());
    });
    app.get("/healthz", (_request, response) => {
        response.json({ status: "ok" });
    });
    const clientDistPath = node_path_1.default.resolve(__dirname, "../../dist/client");
    if (node_fs_1.default.existsSync(clientDistPath)) {
        app.use("/timesheet-app", express_1.default.static(clientDistPath));
        app.get("/timesheet-app/*", (_request, response) => {
            response.sendFile(node_path_1.default.join(clientDistPath, "index.html"));
        });
    }
    const electronicsHtmlExists = node_fs_1.default.existsSync(ELECTRONICS_HTML_PATH);
    if (electronicsHtmlExists) {
        console.log(`[http] serving electronics page from ${ELECTRONICS_HTML_PATH}`);
        app.use(express_1.default.static(ELECTRONICS_ROOT_DIR));
        app.get("*", (request, response, next) => {
            if (request.path.startsWith("/api/") || request.path.startsWith("/timesheet-app")) {
                next();
                return;
            }
            response.sendFile(ELECTRONICS_HTML_PATH);
        });
    }
    else if (node_fs_1.default.existsSync(clientDistPath)) {
        app.use(express_1.default.static(clientDistPath));
        app.get("*", (request, response, next) => {
            if (request.path.startsWith("/api/")) {
                next();
                return;
            }
            response.sendFile(node_path_1.default.join(clientDistPath, "index.html"));
        });
    }
    app.listen(HTTP_PORT, () => {
        console.log(`[http] listening on http://localhost:${HTTP_PORT}`);
    });
}
function logClassification(parsed, classification) {
    const label = classification.side === null ? "Unknown" : classification.side.toString();
    const confidence = classification.side !== null && classification.confident ? " (confident)" : "";
    console.log(`[mqtt] ${parsed.timestampText} | Side ${label}${confidence}`);
}
function startMqttClient() {
    ensureProfilesLoaded();
    const client = mqtt_1.default.connect(MQTT_BROKER_URL);
    client.on("connect", () => {
        console.log(`[mqtt] connected to ${MQTT_BROKER_URL}`);
        client.subscribe(MQTT_TOPIC, (error) => {
            if (error) {
                console.error(`[mqtt] failed to subscribe to ${MQTT_TOPIC}:`, error.message);
            }
            else {
                console.log(`[mqtt] subscribed to ${MQTT_TOPIC}`);
            }
        });
    });
    client.on("message", (topic, payload) => {
        const rawText = payload.toString("utf-8").trim();
        if (!rawText) {
            return;
        }
        const parsed = (0, parser_1.parsePayload)(rawText);
        if (!parsed) {
            console.warn(`[mqtt] unable to parse payload on ${topic}`);
            return;
        }
        const vector = [...parsed.ax, ...parsed.gy];
        const classification = (0, profiles_1.classifyVector)(vector, sideProfiles);
        const receivedAtIso = new Date().toISOString();
        try {
            (0, database_1.persistReading)({
                topic,
                parsed,
                classification,
                receivedAtIso
            });
        }
        catch (error) {
            console.error(`[db] failed to persist reading: ${error.message}`);
        }
        updateLatest(topic, parsed, receivedAtIso, classification);
        logClassification(parsed, classification);
    });
    client.on("error", (error) => {
        console.error("[mqtt] client error", error);
    });
}
async function bootstrap() {
    sideProfiles = await (0, profiles_1.loadProfiles)(REFERENCE_PATH);
    console.log(`[bootstrap] loaded ${sideProfiles.length} side profiles`);
    console.log(`[bootstrap] database file: ${(0, database_1.getDatabasePath)()}`);
    ensureProfilesLoaded();
    startHttpServer();
    startMqttClient();
}
bootstrap().catch((error) => {
    console.error("[bootstrap] failed to start timesheet device service", error);
    process.exitCode = 1;
});
