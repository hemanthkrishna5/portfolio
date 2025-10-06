"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProfiles = loadProfiles;
exports.classifyVector = classifyVector;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const MIN_MARGIN = 0.05;
function toTuple(values) {
    if (!values || values.length !== 3) {
        return undefined;
    }
    if (values.some((value) => !Number.isFinite(value))) {
        return undefined;
    }
    return [values[0], values[1], values[2]];
}
function buildProfile(side, raw) {
    const axMin = toTuple(raw.ax?.min);
    const axMax = toTuple(raw.ax?.max);
    const axMean = toTuple(raw.ax?.mean);
    const gyMin = toTuple(raw.gy?.min);
    const gyMax = toTuple(raw.gy?.max);
    const gyMean = toTuple(raw.gy?.mean);
    if (!axMin || !axMax || !axMean || !gyMin || !gyMax || !gyMean) {
        return undefined;
    }
    const minVector = [...axMin, ...gyMin];
    const maxVector = [...axMax, ...gyMax];
    const mean = [...axMean, ...gyMean];
    const ranges = minVector.map((minValue, index) => [minValue, maxVector[index]]);
    const margins = ranges.map(([lowest, highest]) => {
        const span = highest - lowest;
        return Math.max(MIN_MARGIN, span !== 0 ? span * 0.5 : MIN_MARGIN);
    });
    return {
        side,
        mean,
        ranges,
        margins
    };
}
async function loadProfiles(referenceFilePath) {
    const resolvedPath = node_path_1.default.resolve(referenceFilePath);
    const rawContent = await promises_1.default.readFile(resolvedPath, "utf-8");
    const parsed = JSON.parse(rawContent);
    const entries = Object.entries(parsed)
        .map(([sideText, payload]) => ({ side: Number(sideText), payload }))
        .filter(({ side }) => Number.isInteger(side));
    const profiles = [];
    for (const { side, payload } of entries) {
        const profile = buildProfile(side, payload);
        if (profile) {
            profiles.push(profile);
        }
    }
    return profiles;
}
function squaredDistance(vector, mean) {
    return vector.reduce((total, value, index) => {
        const diff = value - mean[index];
        return total + diff * diff;
    }, 0);
}
function withinRanges(vector, profile) {
    for (let index = 0; index < vector.length; index += 1) {
        const value = vector[index];
        const [min, max] = profile.ranges[index];
        const margin = profile.margins[index];
        if (value < min - margin || value > max + margin) {
            return false;
        }
    }
    return true;
}
function classifyVector(vector, profiles) {
    if (profiles.length === 0) {
        return {
            side: null,
            confident: false,
            distance: null
        };
    }
    let bestConfident;
    let bestFallback;
    for (const profile of profiles) {
        const distanceSq = squaredDistance(vector, profile.mean);
        const distance = Math.sqrt(distanceSq);
        if (withinRanges(vector, profile)) {
            if (!bestConfident || distance < bestConfident.distance) {
                bestConfident = { side: profile.side, distance };
            }
        }
        if (!bestFallback || distance < bestFallback.distance) {
            bestFallback = { side: profile.side, distance };
        }
    }
    if (bestConfident) {
        return {
            side: bestConfident.side,
            confident: true,
            distance: bestConfident.distance
        };
    }
    if (bestFallback) {
        return {
            side: bestFallback.side,
            confident: false,
            distance: bestFallback.distance
        };
    }
    return {
        side: null,
        confident: false,
        distance: null
    };
}
