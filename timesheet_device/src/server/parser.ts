import type { ParsedMessage } from "../shared/types";


const whitespaceRegex = /\s+/;

function parseTimestampIso(timestampText: string): string | undefined {
  const trimmed = timestampText.trim();
  const segments = trimmed.split(whitespaceRegex);
  if (segments.length < 2) {
    return undefined;
  }
  const [datePart, timePart] = segments;
  const datePieces = datePart.split(/[\/]/);
  if (datePieces.length !== 3) {
    return undefined;
  }
  const timePieces = timePart.split(":");
  if (timePieces.length < 2) {
    return undefined;
  }

  const [partA, partB, yearText] = datePieces;
  const [hourText, minuteText, secondText = "0"] = timePieces;

  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  if (!isFinite(hour) || !isFinite(minute) || !isFinite(second)) {
    return undefined;
  }

  const year = Number(yearText);
  if (!isFinite(year)) {
    return undefined;
  }

  const attempts: Array<[number, number]> = [
    [Number(partA), Number(partB)],
    [Number(partB), Number(partA)]
  ];

  for (const [monthCandidate, dayCandidate] of attempts) {
    if (!isFinite(monthCandidate) || !isFinite(dayCandidate)) {
      continue;
    }
    if (monthCandidate < 1 || monthCandidate > 12) {
      continue;
    }
    if (dayCandidate < 1 || dayCandidate > 31) {
      continue;
    }

    const month = monthCandidate;
    const day = dayCandidate;

    const date = new Date(year, month - 1, day, hour, minute, second);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day ||
      date.getHours() !== hour ||
      date.getMinutes() !== minute ||
      date.getSeconds() !== second
    ) {
      continue;
    }

    const pad = (value: number): string => value.toString().padStart(2, "0");
    return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
  }

  return undefined;
}

export function parsePayload(raw: string): ParsedMessage | undefined {
  if (!raw.includes("TS:")) {
    return undefined;
  }

  const [, tail] = raw.split("TS:", 2);
  if (!tail) {
    return undefined;
  }

  const segments = tail
    .split("|")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (segments.length === 0) {
    return undefined;
  }

  const timestampText = segments[0];
  const axSegment = segments.find((segment) => segment.startsWith("AX:"));
  const gySegment = segments.find((segment) => segment.startsWith("GY:"));

  if (!axSegment || !gySegment) {
    return undefined;
  }

  const axValues = axSegment
    .split("AX:", 2)[1]
    ?.split(",")
    .map((value) => Number(value.trim()));
  const gyValues = gySegment
    .split("GY:", 2)[1]
    ?.split(",")
    .map((value) => Number(value.trim()));

  if (!axValues || !gyValues || axValues.length !== 3 || gyValues.length !== 3) {
    return undefined;
  }

  if (axValues.some((value) => !Number.isFinite(value)) || gyValues.some((value) => !Number.isFinite(value))) {
    return undefined;
  }

  const timestampIso = parseTimestampIso(timestampText);

  return {
    raw,
    timestampText,
    timestampIso,
    ax: [axValues[0], axValues[1], axValues[2]],
    gy: [gyValues[0], gyValues[1], gyValues[2]]
  };
}
