import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'

const API_ENDPOINT = '/api/imu/latest'
const HISTORY_ENDPOINT = '/api/imu/history'
const TOTAL_SIDES = 12
const POLL_INTERVAL_MS = 1000
const LABEL_STORAGE_KEY = 'dodec-labels'
const LEGACY_LABEL_KEYS = ['dodeca-labels']
const ACTIVITY_LOG_STORAGE_KEY = 'dodec-activity-log'
const DEFAULT_LABEL_PREFIX = 'Side'
const DAY_MS = 24 * 60 * 60 * 1000
const LABEL_MESSAGE_UPDATE = 'DODEC_LABEL_UPDATE'
const LABEL_MESSAGE_REQUEST = 'DODEC_LABELS_REQUEST'
const LABELS_ENDPOINT = (() => {
  const override = (import.meta as any).env?.VITE_DEVICE_LABELS_URL as string | undefined
  if (override && override.length > 0) {
    return override
  }
  try {
    const apiUrl = new URL(API_ENDPOINT, 'https://placeholder.local')
    const origin = apiUrl.origin === 'https://placeholder.local' ? '' : `${apiUrl.protocol}//${apiUrl.host}`
    return `${origin}/api/labels`
  } catch {
    return '/api/labels'
  }
})()

const ACTIVITY_LOG_ENDPOINT =
  (import.meta as any).env?.VITE_DEVICE_ACTIVITY_LOG_URL ?? '/api/activity-log'
const ACTIVITY_SYNC_INTERVAL_MS = 5 * 60 * 1000

type RangeMode = 'week' | 'month' | 'custom'

interface StoredActivityEntry {
  totalMs: number;
  side: number | null;
}

type ActivityLogMap = Record<string, Record<string, StoredActivityEntry>>

interface LatestReadingResponse {
  side: number | null
  imu_timestamp_text?: string | null
  imu_timestamp_iso?: string | null
  received_at?: string | null
  confidence?: boolean | null
  segment_started_at?: string | null
}

interface LatestReadingState extends LatestReadingResponse {}

interface TimelineState {
  currentLabel: string | null
  startTime: number | null
  lastTimestamp: number | null
  lastSide: number | null
}

interface EditingState {
  dateKey: string
  originalLabel: string
}

interface DateGroup {
  dateKey: string
  rows: Array<{ label: string; totalMs: number; side: number | null }>
  totalMs: number
}

type SaveNotice = { type: 'success' | 'error'; message: string } | null

const normalizeActivityLog = (raw: unknown): ActivityLogMap => {
  const normalized: ActivityLogMap = {}
  if (!raw || typeof raw !== 'object') {
    return normalized
  }
  for (const [dateKey, value] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof dateKey !== 'string' || dateKey.length === 0 || !value || typeof value !== 'object') {
      continue
    }
    const entries: Record<string, StoredActivityEntry> = {}
    for (const [label, payload] of Object.entries(value as Record<string, unknown>)) {
      if (typeof label !== 'string' || label.length === 0) {
        continue
      }
      let totalMs = 0
      let side: number | null = null
      if (typeof payload === 'number') {
        totalMs = Number.isFinite(payload) && payload > 0 ? Math.floor(payload) : 0
      } else if (payload && typeof payload === 'object') {
        const maybeTotal = (payload as { totalMs?: unknown }).totalMs
        const maybeSide = (payload as { side?: unknown }).side
        if (typeof maybeTotal === 'number' && Number.isFinite(maybeTotal) && maybeTotal > 0) {
          totalMs = Math.floor(maybeTotal)
        }
        if (typeof maybeSide === 'number' && Number.isFinite(maybeSide)) {
          side = Math.floor(maybeSide)
        }
      }
      if (totalMs > 0 || side !== null) {
        entries[label] = { totalMs, side }
      }
    }
    if (Object.keys(entries).length > 0) {
      normalized[dateKey] = entries
    }
  }
  return normalized
}

const sideNumbers = Array.from({ length: TOTAL_SIDES }, (_, index) => index + 1)

const createEmptyLabels = (): Record<number, string> => {
  const result: Record<number, string> = {}
  for (const side of sideNumbers) {
    result[side] = ''
  }
  return result
}

const loadStoredLabels = (): Record<number, string> => {
  if (typeof window === 'undefined') {
    return createEmptyLabels()
  }

  const readFromKey = (key: string): Record<number, string> | null => {
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) {
        return null
      }
      const parsed = JSON.parse(raw) as Record<string, string>
      const base = createEmptyLabels()
      for (const [entryKey, value] of Object.entries(parsed)) {
        const numericSide = Number(entryKey)
        if (Number.isFinite(numericSide) && numericSide >= 1 && numericSide <= TOTAL_SIDES) {
          base[numericSide] = String(value ?? '')
        }
      }
      return base
    } catch (error) {
      console.warn('Unable to read stored labels', error)
      return null
    }
  }

  const primary = readFromKey(LABEL_STORAGE_KEY)
  if (primary) {
    return primary
  }

  for (const legacyKey of LEGACY_LABEL_KEYS) {
    const legacy = readFromKey(legacyKey)
    if (legacy) {
      try {
        window.localStorage.setItem(LABEL_STORAGE_KEY, JSON.stringify(legacy))
      } catch {
        // ignore write issues for legacy data
      }
      return legacy
    }
  }

  return createEmptyLabels()
}

const createTimelineState = (): TimelineState => ({
  currentLabel: null,
  startTime: null,
  lastTimestamp: null,
  lastSide: null,
})

const resolveLabel = (labels: Record<number, string>, side: number): string => {
  const entry = labels[side]?.trim()
  return entry && entry.length > 0 ? entry : `${DEFAULT_LABEL_PREFIX} ${side}`
}

const parseTimestampMs = (payload: LatestReadingResponse): number => {
  const candidates = [payload.received_at, payload.imu_timestamp_iso]
  for (const value of candidates) {
    if (value) {
      const parsed = Date.parse(value)
      if (!Number.isNaN(parsed)) {
        return parsed
      }
    }
  }

  if (payload.imu_timestamp_text) {
    const normalized = payload.imu_timestamp_text.replace(' ', 'T')
    const parsed = Date.parse(normalized)
    if (!Number.isNaN(parsed)) {
      return parsed
    }
  }

  return Date.now()
}

const safeParseTimestamp = (value?: string | null): number | null => {
  if (!value) {
    return null
  }
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? null : parsed
}

const toDateKey = (timestampMs: number): string => {
  const date = new Date(timestampMs)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const getDateBounds = (dateKey: string): { start: number; end: number } => {
  const base = parseDateKey(dateKey)
  const start = new Date(base.getFullYear(), base.getMonth(), base.getDate()).getTime()
  const end = start + DAY_MS
  return { start, end }
}

const formatDateDisplay = (dateKey: string): string => {
  const date = parseDateKey(dateKey)
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
}

const formatTimestamp = (timestamp?: string | null): string => {
  if (!timestamp) {
    return 'Waiting for data?'
  }
  return timestamp.replace('T', ' ').replace(/\+.*$/, '')
}

const formatDuration = (ms: number): string => {
  if (!Number.isFinite(ms) || ms <= 0) {
    return '00:00'
  }
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const formatDurationForInput = (ms: number): string => formatDuration(ms)

const parseDurationInput = (raw: string): number => {
  const value = raw.trim()
  if (!value) {
    return NaN
  }
  const parts = value.split(':')
  if (parts.length > 1) {
    if (parts.length > 3) {
      return NaN
    }
    const numeric = parts.map((part) => Number(part))
    if (numeric.some((num) => Number.isNaN(num) || num < 0)) {
      return NaN
    }
    let hours = 0
    let minutes = 0
    let seconds = 0
    if (numeric.length === 3) {
      ;[hours, minutes, seconds] = numeric
    } else {
      ;[minutes, seconds] = numeric
    }
    return Math.max(0, hours * 3600 + minutes * 60 + seconds) * 1000
  }
  const minutes = Number(value)
  if (Number.isNaN(minutes) || minutes < 0) {
    return NaN
  }
  return minutes * 60 * 1000
}

const escapeCsvField = (value: string): string => {
  if (value.includes("\"") || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export default function App() {
  const [latest, setLatest] = useState<LatestReadingState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activityLog, setActivityLog] = useState<ActivityLogMap>(() => {
    if (typeof window === 'undefined') {
      return {}
    }
    try {
      const stored = window.localStorage.getItem(ACTIVITY_LOG_STORAGE_KEY)
      return stored ? normalizeActivityLog(JSON.parse(stored)) : {}
    } catch (storageError) {
      console.warn('Unable to read stored activity log', storageError)
      return {}
    }
  })
  const activityLogRef = useRef<ActivityLogMap>(activityLog)
  const [editing, setEditing] = useState<EditingState | null>(null)
  const [editingDurationValue, setEditingDurationValue] = useState<string>('')
  const [editingLabelValue, setEditingLabelValue] = useState<string>('')
  const [editError, setEditError] = useState<string | null>(null)
  const [expandedDates, setExpandedDates] = useState<string[]>(() => [toDateKey(Date.now())])
  const [rangeMode, setRangeMode] = useState<RangeMode>('week')
  const [customStart, setCustomStart] = useState<string>(toDateKey(Date.now()))
  const [customEnd, setCustomEnd] = useState<string>(toDateKey(Date.now()))
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [saveNotice, setSaveNotice] = useState<SaveNotice>(null)
  const [labels, setLabels] = useState<Record<number, string>>(() => loadStoredLabels())

  const labelsRef = useRef(labels)
  const suppressLabelBroadcastRef = useRef(false)
  const labelSaveTimeoutsRef = useRef<Record<number, number | null>>({})
  const saveNoticeTimeoutRef = useRef<number | null>(null)
  const timelineRef = useRef<TimelineState>(createTimelineState())
  const [historyReady, setHistoryReady] = useState(false)
  const [hasLoadedRemoteLog, setHasLoadedRemoteLog] = useState(false)
  const [pendingSync, setPendingSync] = useState(false)
  const pendingSyncRef = useRef(false)
  const skipRemoteLoadRef = useRef(false)
  const remoteLogRequestIdRef = useRef(0)
  const applyingRemoteLogRef = useRef(false)
  const historyCutoffRef = useRef<string | null>(null)
  const [historyCursorReady, setHistoryCursorReady] = useState(false)
  const replayingHistoryRef = useRef(false)

  const markPendingSync = useCallback(() => {
    if (!pendingSyncRef.current) {
      pendingSyncRef.current = true
      setPendingSync(true)
    }
  }, [])

  const clearPendingSync = useCallback(() => {
    if (pendingSyncRef.current) {
      pendingSyncRef.current = false
      setPendingSync(false)
    }
  }, [])

  const applyActivityLogUpdate = useCallback(
    (updater: (prev: ActivityLogMap) => ActivityLogMap, options?: { markDirty?: boolean }) => {
      setActivityLog((prev) => {
        const next = updater(prev)
        activityLogRef.current = next
        const shouldMarkDirty = (options?.markDirty ?? true) && !replayingHistoryRef.current
        if (shouldMarkDirty && next !== prev) {
          if (!hasLoadedRemoteLog) {
            skipRemoteLoadRef.current = true
          }
          markPendingSync()
        }
        return next
      })
    },
    [hasLoadedRemoteLog, markPendingSync],
  )

  const fetchRemoteActivityLog = useCallback(
    async (options?: { allowSkip?: boolean }) => {
      const allowSkip = options?.allowSkip ?? true
      const requestId = remoteLogRequestIdRef.current + 1
      remoteLogRequestIdRef.current = requestId
      const response = await fetch(ACTIVITY_LOG_ENDPOINT, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`Activity log request failed with status ${response.status}`)
      }
      const payload = (await response.json()) as { entries?: unknown; historyCutoffIso?: unknown }
      const historyCutoffIso =
        typeof payload?.historyCutoffIso === 'string' && payload.historyCutoffIso.length > 0
          ? payload.historyCutoffIso
          : null
      historyCutoffRef.current = historyCutoffIso
      if (requestId !== remoteLogRequestIdRef.current) {
        return false
      }
      if (payload && typeof payload === 'object' && payload.entries) {
        const shouldSkip = allowSkip && skipRemoteLoadRef.current
        if (shouldSkip) {
          console.warn('[activity-log] skipped applying remote log because local edits occurred first')
          skipRemoteLoadRef.current = false
          setHasLoadedRemoteLog(true)
          if (!pendingSyncRef.current) {
            clearPendingSync()
          }
          return false
        }
        applyingRemoteLogRef.current = true
        applyActivityLogUpdate(() => normalizeActivityLog(payload.entries), { markDirty: false })
      }
      skipRemoteLoadRef.current = false
      setHasLoadedRemoteLog(true)
      if (!pendingSyncRef.current) {
        clearPendingSync()
      }
      return true
    },
    [applyActivityLogUpdate, clearPendingSync],
  )

  useEffect(() => {
    activityLogRef.current = activityLog
  }, [activityLog])

  const addDurationToLog = useCallback((label: string, side: number | null, startMs: number, endMs: number) => {
    if (endMs <= startMs) {
      return
    }
    if (replayingHistoryRef.current) {
      return
    }
    applyActivityLogUpdate((prev) => {
      const next: ActivityLogMap = { ...prev }
      let cursor = startMs
      while (cursor < endMs) {
        const dateKey = toDateKey(cursor)
        const { end } = getDateBounds(dateKey)
        const chunkEnd = Math.min(endMs, end)
        const duration = Math.max(0, chunkEnd - cursor)
        if (duration > 0) {
          const entry = { ...(next[dateKey] ?? {}) }
          const existing = entry[label]
          const totalMs = (existing?.totalMs ?? 0) + duration
          const resolvedSide = side ?? existing?.side ?? null
          entry[label] = { totalMs, side: resolvedSide }
          next[dateKey] = entry
        }
        cursor = chunkEnd
      }
      return next
    })
  }, [applyActivityLogUpdate, replayingHistoryRef])

  const resetActivityState = useCallback(() => {
    timelineRef.current = createTimelineState()
    if (replayingHistoryRef.current) {
      return
    }
    applyActivityLogUpdate(() => ({}))
  }, [applyActivityLogUpdate, replayingHistoryRef])

  const handleReading = useCallback(
    (payload: LatestReadingResponse) => {
      const sideValue = typeof payload.side === 'number' ? payload.side : null
      if (!sideValue) {
        return
      }

      const label = resolveLabel(labelsRef.current, sideValue)
      const timestampMs = parseTimestampMs(payload)
      const segmentStartMs = payload.segment_started_at ? safeParseTimestamp(payload.segment_started_at) : null
      const state = timelineRef.current

      if (state.currentLabel === null || state.startTime === null) {
        state.currentLabel = label
        state.startTime = segmentStartMs ?? timestampMs
        state.lastTimestamp = timestampMs
        state.lastSide = sideValue
        return
      }

      if (label === state.currentLabel) {
        if (segmentStartMs !== null && (state.startTime === null || segmentStartMs < state.startTime)) {
          state.startTime = segmentStartMs
        }
        state.lastTimestamp = timestampMs
        state.lastSide = sideValue
        return
      }

      const start = state.startTime
      const end = timestampMs
      if (end > start) {
        addDurationToLog(state.currentLabel, state.lastSide, start, end)
      }

      state.currentLabel = label
      state.startTime = segmentStartMs ?? timestampMs
      state.lastTimestamp = timestampMs
      state.lastSide = sideValue
    },
    [addDurationToLog],
  )

  useEffect(() => {
    labelsRef.current = labels
    if (typeof window !== 'undefined') {
      const serialized = JSON.stringify(labels)
      window.localStorage.setItem(LABEL_STORAGE_KEY, serialized)
      for (const legacyKey of LEGACY_LABEL_KEYS) {
        window.localStorage.setItem(legacyKey, serialized)
      }
      if (!suppressLabelBroadcastRef.current && window.parent && window.parent !== window) {
        window.parent.postMessage({ type: LABEL_MESSAGE_UPDATE, labels }, '*')
      }
    }
    suppressLabelBroadcastRef.current = false
    const state = timelineRef.current
    if (state.lastSide !== null) {
      state.currentLabel = resolveLabel(labels, state.lastSide)
    }
  }, [labels])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ACTIVITY_LOG_STORAGE_KEY, JSON.stringify(activityLog))
    }
  }, [activityLog])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        await fetchRemoteActivityLog({ allowSkip: true })
      } catch (error) {
        if (!cancelled) {
          console.warn('[activity-log] failed to load activity log from server', error)
          skipRemoteLoadRef.current = false
          setHasLoadedRemoteLog(true)
        }
      } finally {
        if (!cancelled) {
          setHistoryCursorReady(true)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [fetchRemoteActivityLog])

  useEffect(() => () => {
    if (typeof window === 'undefined') {
      return
    }
    for (const key of Object.keys(labelSaveTimeoutsRef.current)) {
      const timeoutId = labelSaveTimeoutsRef.current[Number(key)]
      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId)
      }
    }
    if (saveNoticeTimeoutRef.current !== null) {
      window.clearTimeout(saveNoticeTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadRemoteLabels = async () => {
      try {
        const response = await fetch(LABELS_ENDPOINT, { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`Failed to load labels (status ${response.status})`)
        }
        const payload = (await response.json()) as { labels?: Record<string, string> }
        if (cancelled || !payload || typeof payload.labels !== 'object' || payload.labels === null) {
          return
        }
        suppressLabelBroadcastRef.current = true
        setLabels((prev) => {
          const next = { ...prev }
          let changed = false
          for (const [key, value] of Object.entries(payload.labels)) {
            const numericSide = Number(key)
            if (!Number.isFinite(numericSide) || numericSide < 1 || numericSide > TOTAL_SIDES) {
              continue
            }
            const sanitized = typeof value === 'string' ? value : ''
            if (next[numericSide] !== sanitized) {
              next[numericSide] = sanitized
              changed = true
            }
          }
          return changed ? next : prev
        })
      } catch (error) {
        console.error('[timesheet-app] failed to load labels from server', error)
      }
    }

    loadRemoteLabels()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleMessage = (event: MessageEvent) => {
      const data = event?.data
      if (!data || typeof data !== 'object') {
        return
      }

      if (data.type === LABEL_MESSAGE_UPDATE && data.labels && typeof data.labels === 'object') {
        suppressLabelBroadcastRef.current = true
        const incoming = data.labels as Record<string, unknown>
        setLabels((prev) => {
          const next = { ...prev }
          for (const [key, value] of Object.entries(incoming)) {
            const numericSide = Number(key)
            if (!Number.isFinite(numericSide) || numericSide < 1 || numericSide > TOTAL_SIDES) {
              continue
            }
            next[numericSide] = typeof value === 'string' ? value : ''
          }
          return { ...next }
        })
      } else if (data.type === LABEL_MESSAGE_REQUEST) {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: LABEL_MESSAGE_UPDATE, labels: labelsRef.current }, event.origin || '*')
        }
      }
    }

    window.addEventListener('message', handleMessage)
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: LABEL_MESSAGE_REQUEST }, '*')
    }

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    if (!historyCursorReady) {
      return
    }
    let cancelled = false
    const loadHistory = async () => {
      replayingHistoryRef.current = true
      try {
        const params = new URLSearchParams({ limit: '5000' })
        const cursor = historyCutoffRef.current
        if (cursor) {
          params.set('since', cursor)
        }
        const response = await fetch(`${HISTORY_ENDPOINT}?${params.toString()}`, { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`History request failed with status ${response.status}`)
        }
        const entries = (await response.json()) as LatestReadingResponse[]
        if (cancelled) {
          return
        }

        resetActivityState()

        let mostRecent: LatestReadingResponse | null = null
        for (const entry of entries) {
          if (cancelled) {
            break
          }
          handleReading(entry)
          mostRecent = entry
        }

        if (mostRecent) {
          setLatest({
            side: typeof mostRecent.side === 'number' ? mostRecent.side : null,
            imu_timestamp_text: mostRecent.imu_timestamp_text ?? null,
            imu_timestamp_iso: mostRecent.imu_timestamp_iso ?? null,
            received_at: mostRecent.received_at ?? null,
            confidence: mostRecent.confidence ?? null,
          })
        }
        setError(null)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error while loading history')
        }
      } finally {
        replayingHistoryRef.current = false
        if (!cancelled) {
          setHistoryReady(true)
        }
      }
    }

    loadHistory()

    return () => {
      cancelled = true
    }
  }, [handleReading, historyCursorReady, resetActivityState])

  useEffect(() => {
    if (!historyReady) {
      return
    }
    let isMounted = true

    const fetchLatest = async () => {
      try {
        const response = await fetch(API_ENDPOINT, { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = (await response.json()) as LatestReadingResponse
        if (!isMounted) {
          return
        }
        handleReading(payload)
        setLatest({
          side: typeof payload.side === 'number' ? payload.side : null,
          imu_timestamp_text: payload.imu_timestamp_text ?? null,
          imu_timestamp_iso: payload.imu_timestamp_iso ?? null,
          received_at: payload.received_at ?? null,
          confidence: payload.confidence ?? null,
        })
        setError(null)
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      }
    }

    fetchLatest()
    const intervalId = window.setInterval(fetchLatest, POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [handleReading, historyReady])

  const activeState = timelineRef.current
  const activeDateKey = activeState.lastTimestamp ? toDateKey(activeState.lastTimestamp) : toDateKey(Date.now())

  useEffect(() => {
    setExpandedDates((prev) => (prev.includes(activeDateKey) ? prev : [...prev, activeDateKey]))
  }, [activeDateKey])

  const submitLabelUpdate = useCallback(async (side: number, value: string) => {
    try {
      const response = await fetch(`${LABELS_ENDPOINT.replace(/\/$/, '')}/${side}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: value })
      })
      if (!response.ok) {
        throw new Error(`Failed to persist label (status ${response.status})`)
      }
    } catch (error) {
      console.error(`[timesheet-app] failed to persist label for side ${side}`, error)
    }
  }, [])

  const scheduleLabelSave = useCallback((side: number, value: string) => {
    const nextValue = value.trim()
    if (typeof window === 'undefined') {
      submitLabelUpdate(side, nextValue)
      return
    }
    const existing = labelSaveTimeoutsRef.current[side]
    if (typeof existing === 'number') {
      window.clearTimeout(existing)
    }
    labelSaveTimeoutsRef.current[side] = window.setTimeout(() => {
      labelSaveTimeoutsRef.current[side] = null
      submitLabelUpdate(side, nextValue)
    }, 400)
  }, [submitLabelUpdate])

  const handleLabelChange = useCallback(
    (side: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value
      setLabels((prev) => ({ ...prev, [side]: nextValue }))
      scheduleLabelSave(side, nextValue)
    },
    [scheduleLabelSave],
  )

  const getActiveContribution = (dateKey: string, label: string): number => {
    const state = timelineRef.current
    if (!state.currentLabel || state.currentLabel !== label) {
      return 0
    }
    if (state.startTime === null || state.lastTimestamp === null) {
      return 0
    }
    const { start, end } = getDateBounds(dateKey)
    const overlapStart = Math.max(start, state.startTime)
    const overlapEnd = Math.min(end, state.lastTimestamp)
    return overlapEnd > overlapStart ? overlapEnd - overlapStart : 0
  }

  const getRowsForDate = useCallback(
    (dateKey: string): Array<{ label: string; totalMs: number; side: number | null }> => {
      const storedEntries = activityLog[dateKey] ?? {}
      const rows = Object.entries(storedEntries).map(([label, entry]) => ({
        label,
        totalMs: entry.totalMs,
        side: entry.side ?? null,
      }))
      const state = timelineRef.current
      if (state.currentLabel && state.startTime !== null && state.lastTimestamp !== null) {
        const activeMs = getActiveContribution(dateKey, state.currentLabel)
        if (activeMs > 0) {
          const existing = rows.find((row) => row.label === state.currentLabel)
          const activeSide = state.lastSide
          if (existing) {
            existing.totalMs += activeMs
            if (existing.side === null) {
              existing.side = activeSide
            }
          } else {
            rows.push({ label: state.currentLabel, totalMs: activeMs, side: activeSide ?? null })
          }
        }
      }
      return rows.sort((a, b) => b.totalMs - a.totalMs)
    },
    [activityLog, latest],
  )

  const sortedDates = useMemo(() => {
    const keys = new Set(Object.keys(activityLog))
    keys.add(activeDateKey)
    return Array.from(keys).sort((a, b) => (a === b ? 0 : a > b ? -1 : 1))
  }, [activityLog, activeDateKey])

  const dateGroups: DateGroup[] = useMemo(() => {
    return sortedDates
      .map((dateKey) => {
        const rows = getRowsForDate(dateKey)
        if (rows.length === 0) {
          return null
        }
        const totalMs = rows.reduce((sum, row) => sum + row.totalMs, 0)
        return { dateKey, rows, totalMs }
      })
      .filter(Boolean) as DateGroup[]
  }, [sortedDates, getRowsForDate])

  const beginEdit = useCallback((dateKey: string, label: string, totalMs: number) => {
    const state = timelineRef.current
    const isLocked = state.currentLabel === label && dateKey === activeDateKey
    if (isLocked) {
      setEditError('Stop the current activity before editing it.')
      return
    }
    setEditing({ dateKey, originalLabel: label })
    setEditingDurationValue(formatDurationForInput(totalMs))
    setEditingLabelValue(label)
    setEditError(null)
  }, [activeDateKey])

  const handleEditDurationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEditingDurationValue(event.target.value)
  }, [])

  const handleEditLabelChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEditingLabelValue(event.target.value)
  }, [])

  const handleEditCancel = useCallback(() => {
    setEditing(null)
    setEditingDurationValue('')
    setEditingLabelValue('')
    setEditError(null)
  }, [])

  const applyEditingChanges = useCallback((): boolean => {
    if (!editing) {
      return true
    }
    const { dateKey, originalLabel } = editing
    const parsedMs = parseDurationInput(editingDurationValue)
    if (!Number.isFinite(parsedMs)) {
      setEditError('Please enter duration as mm:ss, hh:mm:ss, or minutes.')
      return false
    }
    const normalizedLabel = editingLabelValue.trim()
    if (normalizedLabel.length === 0) {
      setEditError('Activity name cannot be empty.')
      return false
    }
    const activeContribution = getActiveContribution(dateKey, originalLabel)
    if (parsedMs < activeContribution) {
      setEditError(`Duration cannot be less than the active segment (${formatDuration(activeContribution)}).`)
      return false
    }
    const storedMs = Math.max(0, parsedMs - activeContribution)
    applyActivityLogUpdate((prev) => {
      const next: ActivityLogMap = { ...prev }
      const entry = { ...(next[dateKey] ?? {}) }
      const originalEntry = entry[originalLabel]
      if (originalEntry) {
        delete entry[originalLabel]
      }
      if (storedMs > 0) {
        const destination = entry[normalizedLabel]
        const combinedTotal = (destination?.totalMs ?? 0) + storedMs
        const resolvedSide =
          normalizedLabel === originalLabel
            ? originalEntry?.side ?? destination?.side ?? null
            : destination?.side ?? originalEntry?.side ?? null
        entry[normalizedLabel] = { totalMs: combinedTotal, side: resolvedSide }
      }
      if (Object.keys(entry).length === 0) {
        delete next[dateKey]
      } else {
        next[dateKey] = entry
      }
      return next
    })
    setEditing(null)
    setEditingDurationValue('')
    setEditingLabelValue('')
    setEditError(null)
    return true
  }, [applyActivityLogUpdate, editing, editingDurationValue, editingLabelValue, getActiveContribution])

  const handleEditSave = useCallback(() => {
    void applyEditingChanges()
  }, [applyEditingChanges])

  const handleDelete = useCallback(
    (dateKey: string, label: string) => {
      const activeContribution = getActiveContribution(dateKey, label)
      if (activeContribution > 0) {
        setEditError('Stop the current activity before deleting it.')
        return
      }
      applyActivityLogUpdate((prev) => {
        const entry = prev[dateKey]
        if (!entry || !(label in entry)) {
          return prev
        }
        const next: ActivityLogMap = { ...prev }
        const updatedEntry = { ...entry }
        delete updatedEntry[label]
        if (Object.keys(updatedEntry).length === 0) {
          delete next[dateKey]
        } else {
          next[dateKey] = updatedEntry
        }
        return next
      })
      if (editing && editing.dateKey === dateKey && editing.originalLabel === label) {
        setEditing(null)
        setEditingDurationValue('')
        setEditingLabelValue('')
      }
      setEditError(null)
    },
    [applyActivityLogUpdate, editing, getActiveContribution],
  )

  const toggleDate = useCallback((dateKey: string) => {
    setExpandedDates((prev) => (prev.includes(dateKey) ? prev.filter((key) => key !== dateKey) : [...prev, dateKey]))
  }, [])

  const getRangeBounds = (): { start: number; end: number } | null => {
    if (rangeMode === 'week') {
      const { start: todayStart, end } = getDateBounds(activeDateKey)
      const startDate = new Date(todayStart)
      startDate.setDate(startDate.getDate() - 6)
      const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime()
      return { start, end }
    }
    if (rangeMode === 'month') {
      const date = parseDateKey(activeDateKey)
      const start = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime()
      return { start, end }
    }
    const startDate = parseDateKey(customStart)
    const endDate = parseDateKey(customEnd)
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return null
    }
    if (startDate > endDate) {
      return null
    }
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime()
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1).getTime()
    return { start, end }
  }

  const handleDownloadCsv = useCallback(() => {
    const bounds = getRangeBounds()
    if (!bounds) {
      setDownloadError('Please provide a valid date range before downloading.')
      return
    }
    const rows: string[] = []
    for (const dateKey of sortedDates) {
      const { start, end } = getDateBounds(dateKey)
      if (end <= bounds.start || start >= bounds.end) {
        continue
      }
      const dateRows = getRowsForDate(dateKey)
      if (dateRows.length === 0) {
        continue
      }
      const dateLabel = formatDateDisplay(dateKey)
      for (const row of dateRows) {
        const sideText = row.side !== null ? `Side ${row.side}` : ''
        rows.push(`${escapeCsvField(dateLabel)},${escapeCsvField(row.label)},${escapeCsvField(sideText)},${formatDuration(row.totalMs)}`)
      }
    }
    if (rows.length === 0) {
      setDownloadError('No activity recorded in the selected range.')
      return
    }
    const csv = ['Date,Activity,Side,Duration', ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const suffix = rangeMode === 'custom' ? 'custom' : rangeMode
    link.download = `activity-log-${suffix}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setDownloadError(null)
  }, [getRowsForDate, rangeMode, sortedDates, customStart, customEnd])

  const activeSide = latest?.side ?? null
  const activeLabel = useMemo(() => {
    if (activeSide === null) {
      return null
    }
    return resolveLabel(labels, activeSide)
  }, [activeSide, labels])

  const sourceTimestamp = latest?.imu_timestamp_text ?? latest?.imu_timestamp_iso ?? latest?.received_at ?? null

  const handleManualSave = useCallback(async () => {
    if (isSaving || isClearing) {
      return
    }
    setIsSaving(true)
    setSaveNotice(null)
    if (typeof window !== 'undefined' && saveNoticeTimeoutRef.current !== null) {
      window.clearTimeout(saveNoticeTimeoutRef.current)
      saveNoticeTimeoutRef.current = null
    }

    const editApplied = applyEditingChanges()
    if (!editApplied) {
      setSaveNotice({ type: 'error', message: 'Please finish editing or fix validation errors before saving.' })
      setIsSaving(false)
      return
    }

    const entries = activityLogRef.current
    try {
      const response = await fetch(ACTIVITY_LOG_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries })
      })
      if (!response.ok) {
        throw new Error(`Activity log sync failed with status ${response.status}`)
      }
      try {
        const payload = (await response.json()) as { entries?: unknown; historyCutoffIso?: unknown }
        if (payload && typeof payload === 'object') {
          if (payload.entries) {
            applyActivityLogUpdate(() => normalizeActivityLog(payload.entries), { markDirty: false })
          }
          const cutoff =
            typeof payload.historyCutoffIso === 'string' && payload.historyCutoffIso.length > 0
              ? payload.historyCutoffIso
              : null
          historyCutoffRef.current = cutoff
          setHistoryCursorReady(true)
        }
      } catch {
        // ignore parse issues
      }
      clearPendingSync()
      setSaveNotice({ type: 'success', message: 'Activity log saved.' })
      if (typeof window !== 'undefined') {
        saveNoticeTimeoutRef.current = window.setTimeout(() => {
          setSaveNotice(null)
          saveNoticeTimeoutRef.current = null
        }, 4000)
      }
    } catch (error) {
      console.warn('[activity-log] failed to save activity log', error)
      setSaveNotice({ type: 'error', message: 'Unable to save activity log. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }, [applyActivityLogUpdate, applyEditingChanges, clearPendingSync, isClearing, isSaving, setHistoryCursorReady])

  const handleClearAll = useCallback(async () => {
    if (isClearing) {
      return
    }
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm('This will delete all activity log entries. Continue?')
      if (!confirmed) {
        return
      }
    }
    if (typeof window !== 'undefined' && saveNoticeTimeoutRef.current !== null) {
      window.clearTimeout(saveNoticeTimeoutRef.current)
      saveNoticeTimeoutRef.current = null
    }
    setSaveNotice(null)
    setIsClearing(true)
    try {
      const response = await fetch(ACTIVITY_LOG_ENDPOINT, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error(`Activity log clear failed with status ${response.status}`)
      }
      let payload: { entries?: unknown; historyCutoffIso?: unknown } | null = null
      try {
        payload = (await response.json()) as { entries?: unknown; historyCutoffIso?: unknown } | null
      } catch {
        payload = null
      }
      replayingHistoryRef.current = true
      timelineRef.current = createTimelineState()
      applyActivityLogUpdate(() => {
        if (payload && payload.entries && typeof payload.entries === 'object') {
          return normalizeActivityLog(payload.entries)
        }
        return {}
      }, { markDirty: false })
      const cutoff =
        payload && typeof payload.historyCutoffIso === 'string' && payload.historyCutoffIso.length > 0
          ? payload.historyCutoffIso
          : new Date().toISOString()
      historyCutoffRef.current = cutoff
      setHistoryCursorReady(true)
      setExpandedDates([toDateKey(Date.now())])
      setEditing(null)
      setEditingDurationValue('')
      setEditingLabelValue('')
      setEditError(null)
      clearPendingSync()
      skipRemoteLoadRef.current = false
      pendingSyncRef.current = false
      setHasLoadedRemoteLog(true)
      setSaveNotice({ type: 'success', message: 'Activity log cleared.' })
      if (typeof window !== 'undefined') {
        saveNoticeTimeoutRef.current = window.setTimeout(() => {
          setSaveNotice(null)
          saveNoticeTimeoutRef.current = null
        }, 4000)
      }
    } catch (error) {
      console.warn('[activity-log] failed to clear activity log', error)
      setSaveNotice({ type: 'error', message: 'Unable to clear activity log. Please try again.' })
    } finally {
      replayingHistoryRef.current = false
      setIsClearing(false)
    }
  }, [applyActivityLogUpdate, clearPendingSync, isClearing, setHistoryCursorReady])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const handleImmediateFlush = () => {
      if (!pendingSyncRef.current) {
        return
      }
      if (navigator.sendBeacon) {
        try {
          const payload = new Blob([JSON.stringify({ entries: activityLogRef.current })], { type: 'application/json' })
          navigator.sendBeacon(ACTIVITY_LOG_ENDPOINT, payload)
          return
        } catch (error) {
          console.warn('[activity-log] sendBeacon flush failed', error)
        }
      }
      // Fallback for when sendBeacon is not available or fails
      fetch(ACTIVITY_LOG_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: activityLogRef.current }),
        keepalive: true
      })
    }
    window.addEventListener('pagehide', handleImmediateFlush)
    window.addEventListener('beforeunload', handleImmediateFlush)
    return () => {
      window.removeEventListener('pagehide', handleImmediateFlush)
      window.removeEventListener('beforeunload', handleImmediateFlush)
    }
  }, [])

  const postHeight = useCallback(() => {
    if (typeof window === 'undefined') {
      return
    }
    if (window.parent === window) {
      return
    }
    const doc = window.document
    const rawHeight = doc.documentElement?.scrollHeight || doc.body?.scrollHeight || window.innerHeight
    const height = Math.max(320, Math.min(Math.ceil(rawHeight), 4000))
    window.parent?.postMessage({ type: 'EMBED_HEIGHT', height }, '*')
  }, [])

  useEffect(() => {
    postHeight()
  }, [postHeight, dateGroups.length, expandedDates, labels, editing, rangeMode])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const handler = () => postHeight()
    window.addEventListener('load', handler)
    window.addEventListener('resize', handler)
    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handler)
      resizeObserver.observe(window.document.documentElement)
    }
    return () => {
      window.removeEventListener('load', handler)
      window.removeEventListener('resize', handler)
      resizeObserver?.disconnect()
    }
  }, [postHeight])

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Do-Decahedron Orientation</h1>
        <p className="status-line">
          <span className="status-label">Latest IMU update:</span>
          <span className="status-value">{formatTimestamp(sourceTimestamp)}</span>
        </p>
        <p className="status-line">
          <span className="status-label">Current activity:</span>
          <span className="status-value">{activeLabel ?? 'Waiting for data?'}</span>
        </p>
        {error ? <p className="error-text">Error: {error}</p> : null}
      </header>

      <section className="activity-summary" aria-live="polite">
        <h2>Activity Log</h2>
        <div className="range-controls">
          <label className="range-option">
            Range
            <select
              className="range-select"
              value={rangeMode}
              onChange={(event) => setRangeMode(event.target.value as RangeMode)}
            >
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          {rangeMode === 'custom' ? (
            <>
              <label className="range-option">
                From
                <input
                  type="date"
                  className="date-input"
                  value={customStart}
                  max={customEnd}
                  onChange={(event) => setCustomStart(event.target.value)}
                />
              </label>
              <label className="range-option">
                To
                <input
                  type="date"
                  className="date-input"
                  value={customEnd}
                  min={customStart}
                  onChange={(event) => setCustomEnd(event.target.value)}
                />
              </label>
            </>
          ) : null}
          <button type="button" className="download-button push-right" onClick={handleDownloadCsv}>
            Download CSV
          </button>
          <button
            type="button"
            className="download-button danger-button"
            onClick={handleClearAll}
            disabled={isClearing || isSaving}
          >
            {isClearing ? 'Clearing...' : 'Clear All'}
          </button>
          <button
            type="button"
            className="download-button save-button"
            onClick={handleManualSave}
            disabled={isSaving || isClearing}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        {downloadError ? <p className="error-text">{downloadError}</p> : null}
        {saveNotice ? (
          <p className={saveNotice.type === 'error' ? 'error-text' : 'success-text'}>{saveNotice.message}</p>
        ) : null}
        {dateGroups.length === 0 ? (
          <p className="placeholder-text">No activity recorded yet.</p>
        ) : (
          dateGroups.map(({ dateKey, rows, totalMs }) => {
            const isExpanded = expandedDates.includes(dateKey)
            const state = timelineRef.current
            return (
              <div key={dateKey} className="date-group">
                <button
                  type="button"
                  className={`date-header${isExpanded ? ' date-header--expanded' : ''}`}
                  onClick={() => toggleDate(dateKey)}
                >
                  <div className="date-header__title">
                    <span className="date-label">{formatDateDisplay(dateKey)}</span>
                    <span className="date-summary">
                      {rows.length} activit{rows.length === 1 ? 'y' : 'ies'} - {formatDuration(totalMs)}
                    </span>
                  </div>
                  <span className="date-header__icon">{isExpanded ? '\u2212' : '+'}</span>
                </button>
                {isExpanded ? (
                  <table className="activity-table">
                    <thead>
                      <tr>
                        <th scope="col">Activity</th>
                        <th scope="col" className="side-heading">Side</th>
                        <th scope="col">Total Duration</th>
                        <th scope="col" className="actions-heading">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => {
                        const isEditing = editing?.dateKey === dateKey && editing.originalLabel === row.label
                        const isLocked = state.currentLabel === row.label && dateKey === activeDateKey
                        return (
                          <tr key={`${dateKey}-${row.label}`}>
                            <td>
                              {isEditing ? (
                                <input
                                  type="text"
                                  className="duration-input"
                                  value={editingLabelValue}
                                  onChange={handleEditLabelChange}
                                  placeholder="Activity name"
                                />
                              ) : (
                                <span>{row.label}</span>
                              )}
                            </td>
                            <td className="side-cell">
                              <span>{row.side !== null ? `Side ${row.side}` : '—'}</span>
                            </td>
                            <td>
                              {isEditing ? (
                                <input
                                  type="text"
                                  className="duration-input"
                                  value={editingDurationValue}
                                  onChange={handleEditDurationChange}
                                  placeholder="mm:ss or hh:mm:ss"
                                />
                              ) : (
                                <span>{formatDuration(row.totalMs)}</span>
                              )}
                            </td>
                            <td className="actions-cell">
                              <div className="action-buttons">
                                {isEditing ? (
                                  <>
                                    <button
                                      type="button"
                                      className="icon-button icon-button--primary"
                                      onClick={handleEditSave}
                                    >
                                      Save
                                    </button>
                                    <button type="button" className="icon-button" onClick={handleEditCancel}>
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      className="icon-button"
                                      disabled={isLocked}
                                      onClick={() => beginEdit(dateKey, row.label, row.totalMs)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="icon-button icon-button--danger"
                                      disabled={isLocked}
                                      onClick={() => handleDelete(dateKey, row.label)}
                                    >
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ) : null}
              </div>
            )
          })
        )}
        {editError ? <p className="error-text">{editError}</p> : null}
      </section>
    </div>
  )
}
