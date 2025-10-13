import { useEffect, useMemo, useState } from 'react';
import type { JSX } from 'react';

const API_ENDPOINT = import.meta.env.VITE_DEVICE_IMU_URL ?? 'https://device.tesseract.sbs/api/imu/latest';
const HISTORY_ENDPOINT = import.meta.env.VITE_DEVICE_HISTORY_URL ?? 'https://device.tesseract.sbs/api/imu/history';
const LABELS_ENDPOINT = import.meta.env.VITE_DEVICE_LABELS_URL ?? 'https://device.tesseract.sbs/api/labels';

interface LatestReading {
  side: number | null;
  confidence?: boolean | null;
  imu_timestamp_text?: string | null;
  imu_timestamp_iso?: string | null;
  received_at?: string | null;
  segment_started_at?: string | null;
}

interface HistoryEntry extends LatestReading {
  raw_payload?: string | null;
}

const DEFAULT_LABEL_PREFIX = 'Side';
const TOTAL_SIDES = 12;
const REFRESH_MS = 3_000;
const HISTORY_LIMIT = 5000;

function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) {
    return '00:00';
  }
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function parseTimestamp(value?: string | null): number | null {
  if (!value) {
    return null;
  }
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function toDateKey(timestampMs: number): string {
  const date = new Date(timestampMs);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateDisplay(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(year, month - 1, day));
}

export function ActivityDashboard(): JSX.Element {
  const [latest, setLatest] = useState<LatestReading | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [labels, setLabels] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadLabels = async () => {
      try {
        const response = await fetch(LABELS_ENDPOINT, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Labels request failed with status ${response.status}`);
        }
        const payload = (await response.json()) as { labels?: Record<string, string> };
        if (!cancelled && payload.labels) {
          const normalized: Record<number, string> = {};
          for (const [key, value] of Object.entries(payload.labels)) {
            const numericSide = Number(key);
            if (Number.isFinite(numericSide) && numericSide >= 1 && numericSide <= TOTAL_SIDES) {
              normalized[numericSide] = String(value ?? '');
            }
          }
          setLabels(normalized);
        }
      } catch (labelError) {
        console.warn('[activity-dashboard] failed to load labels', labelError);
      }
    };

    const loadHistory = async () => {
      try {
        const response = await fetch(`${HISTORY_ENDPOINT}?limit=${HISTORY_LIMIT}`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`History request failed with status ${response.status}`);
        }
        const entries = (await response.json()) as HistoryEntry[];
        if (!cancelled && Array.isArray(entries)) {
          setHistory(entries);
          setHistoryError(null);
        }
      } catch (historyLoadError) {
        if (!cancelled) {
          setHistoryError(historyLoadError instanceof Error ? historyLoadError.message : 'Unable to load activity history');
        }
      }
    };

    const loadLatest = async () => {
      try {
        const response = await fetch(API_ENDPOINT, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Latest request failed with status ${response.status}`);
        }
        const payload = (await response.json()) as LatestReading;
        if (!cancelled) {
          setLatest(payload);
          setError(null);
        }
      } catch (latestError) {
        if (!cancelled) {
          setError(latestError instanceof Error ? latestError.message : 'Unable to load latest reading');
        }
      }
    };

    void loadLabels();
    void loadHistory();
    void loadLatest();
    setLoading(false);

    const intervalId = window.setInterval(() => {
      void loadLatest();
    }, REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  const groupByDate = useMemo(() => {
    const groups = new Map<string, { totalMs: number; rows: Array<{ label: string; totalMs: number }>; start: number }>();

    for (const entry of history) {
      if (!entry || entry.side === null) {
        continue;
      }
      const receivedMs = parseTimestamp(entry.received_at) ?? Date.now();
      const segmentStartMs = parseTimestamp(entry.segment_started_at) ?? receivedMs;
      const duration = Math.max(0, receivedMs - segmentStartMs);
      if (duration <= 0) {
        continue;
      }
      const dateKey = toDateKey(segmentStartMs);
      const entriesForDate = groups.get(dateKey) ?? { totalMs: 0, rows: [], start: segmentStartMs };
      const labelText = labels[entry.side] && labels[entry.side]?.trim()
        ? labels[entry.side].trim()
        : `${DEFAULT_LABEL_PREFIX} ${entry.side}`;

      entriesForDate.totalMs += duration;
      entriesForDate.rows.push({ label: labelText, totalMs: duration });
      groups.set(dateKey, entriesForDate);
    }

    const sorted = Array.from(groups.entries())
      .map(([dateKey, value]) => ({ dateKey, ...value, rows: value.rows.sort((a, b) => b.totalMs - a.totalMs) }))
      .sort((a, b) => (a.dateKey === b.dateKey ? 0 : a.dateKey > b.dateKey ? -1 : 1));

    return sorted;
  }, [history, labels]);

  const activeLabel = useMemo(() => {
    if (!latest || latest.side === null) {
      return 'Waiting for data…';
    }
    const customLabel = labels[latest.side]?.trim();
    return customLabel && customLabel.length > 0 ? customLabel : `${DEFAULT_LABEL_PREFIX} ${latest.side}`;
  }, [labels, latest]);

  const activeDurationText = useMemo(() => {
    if (!latest) {
      return '—';
    }
    const segmentStart = parseTimestamp(latest.segment_started_at);
    if (!segmentStart) {
      return '—';
    }
    const now = Date.now();
    return formatDuration(Math.max(0, now - segmentStart));
  }, [latest]);

  if (loading) {
    return (
      <div className="activity-fallback">
        <p>Loading activity…</p>
      </div>
    );
  }

  return (
    <div className="activity-container">
      <div className="activity-header">
        <div>
          <h3 className="activity-title">Current Activity</h3>
          <div className="activity-summary-line">
            <span className="activity-label">{activeLabel}</span>
            <span className="activity-duration">Active for {activeDurationText}</span>
          </div>
        </div>
        {error ? <p className="activity-error">{error}</p> : null}
      </div>

      <div className="activity-history">
        <h4>Activity Log</h4>
        {historyError ? <p className="activity-error">{historyError}</p> : null}
        {groupByDate.length === 0 ? (
          <p className="activity-placeholder">No activity recorded yet.</p>
        ) : (
          groupByDate.map(({ dateKey, rows, totalMs }) => (
            <details key={dateKey} className="activity-day">
              <summary>
                <span className="activity-day-date">{formatDateDisplay(dateKey)}</span>
                <span className="activity-day-summary">
                  {rows.length} activit{rows.length === 1 ? 'y' : 'ies'} · {formatDuration(totalMs)}
                </span>
              </summary>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Activity</th>
                    <th scope="col">Total Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={`${dateKey}-${index}`}>
                      <td>{row.label}</td>
                      <td>{formatDuration(row.totalMs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          ))
        )}
      </div>
    </div>
  );
}
