export interface ParsedMessage {
  raw: string;
  timestampText: string;
  timestampIso?: string;
  ax: [number, number, number];
  gy: [number, number, number];
}

export interface LatestReadingPayload {
  topic: string | null;
  side: number | null;
  confidence: boolean | null;
  distance: number | null;
  imu_timestamp_text: string | null;
  imu_timestamp_iso: string | null;
  received_at: string | null;
  raw_payload: string | null;
  segment_started_at?: string | null;
}

export interface ClassificationResult {
  side: number | null;
  confident: boolean;
  distance: number | null;
}

export interface SideProfile {
  side: number;
  mean: number[];
  ranges: Array<[number, number]>;
  margins: number[];
}
