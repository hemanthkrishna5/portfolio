// @ts-nocheck
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Box, Typography, Grid, Alert, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text as DreiText } from '@react-three/drei';
import * as THREE from 'three';

const API_ENDPOINT = import.meta.env.VITE_DEVICE_IMU_URL ?? 'https://device.tesseract.sbs/api/imu/latest';
const HISTORY_ENDPOINT =
  import.meta.env.VITE_DEVICE_HISTORY_URL ?? 'https://device.tesseract.sbs/api/imu/history';
const TOTAL_SIDES = 12;
const POLL_INTERVAL_MS = 1000;
const LABEL_STORAGE_KEY = 'dodeca-labels';
const HISTORY_LIMIT = Number.parseInt(import.meta.env.VITE_DEVICE_HISTORY_LIMIT ?? '1200', 10);
const DURATION_TICK_MS = 1000;
const DEFAULT_LABEL_PREFIX = 'Side';
const iframeSrc = import.meta.env.VITE_DEVICE_IFRAME_URL ?? 'https://device.tesseract.sbs/?embed=1';

interface LatestReadingResponse {
  side: number | null;
  imu_timestamp_text?: string | null;
  imu_timestamp_iso?: string | null;
  received_at?: string | null;
  confidence?: boolean | null;
}

interface FaceInfo {
  side: number;
  normal: THREE.Vector3;
  vertexIndices: number[];
  quaternion: THREE.Quaternion;
  labelPosition: [number, number, number];
  highlightPosition: [number, number, number];
  baseColor: [number, number, number];
}

interface DodecahedronData {
  geometry: THREE.BufferGeometry;
  faces: FaceInfo[];
  colorAttribute: THREE.BufferAttribute;
  edgesGeometry: THREE.EdgesGeometry;
}

const createEmptyLabels = (): Record<number, string> => {
  const result: Record<number, string> = {};
  for (let side = 1; side <= TOTAL_SIDES; side += 1) {
    result[side] = '';
  }
  return result;
};

const resolveLabel = (labels: Record<number, string>, side: number): string => {
  const entry = labels[side]?.trim();
  return entry && entry.length > 0 ? entry : `${DEFAULT_LABEL_PREFIX} ${side}`;
};

const loadStoredLabels = (): Record<number, string> => {
  if (typeof window === 'undefined') {
    return createEmptyLabels();
  }
  try {
    const raw = window.localStorage.getItem(LABEL_STORAGE_KEY);
    if (!raw) {
      return createEmptyLabels();
    }
    const parsed = JSON.parse(raw) as Record<string, string>;
    const merged = createEmptyLabels();
    for (const [key, value] of Object.entries(parsed)) {
      const numericSide = Number(key);
      if (Number.isFinite(numericSide) && numericSide >= 1 && numericSide <= TOTAL_SIDES) {
        merged[numericSide] = String(value ?? '');
      }
    }
    return merged;
  } catch (storageError) {
    console.warn('Unable to read stored labels', storageError);
    return createEmptyLabels();
  }
};

export function Electronics() {
  const [latest, setLatest] = useState<LatestReadingResponse | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const error = historyError ?? liveError;
  const [labels, setLabels] = useState<Record<number, string>>(() => loadStoredLabels());
  const [historyReady, setHistoryReady] = useState(false);
  const [activeState, setActiveState] = useState<{ side: number | null; startMs: number | null; lastMs: number | null }>({
    side: null,
    startMs: null,
    lastMs: null,
  });
  const [nowTick, setNowTick] = useState(() => Date.now());

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(720);
  const faceOrder = useMemo(() => parseFaceOrder(import.meta.env.VITE_DODECA_FACE_ORDER), []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(LABEL_STORAGE_KEY, JSON.stringify(labels));
  }, [labels]);

  useEffect(() => {
    const onMessage = (ev: MessageEvent) => {
      if (ev?.data && ev.data.type === 'EMBED_HEIGHT' && typeof ev.data.height === 'number') {
        // Cap to a sensible min/max to avoid layout jumps
        const h = Math.max(320, Math.min(ev.data.height, 4000));
        setIframeHeight(h);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadHistory = async () => {
      if (typeof window === 'undefined') {
        setHistoryReady(true);
        return;
      }

      try {
        const historyUrl = new URL(HISTORY_ENDPOINT, window.location.origin);
        if (!historyUrl.searchParams.has('limit')) {
          historyUrl.searchParams.set('limit', String(HISTORY_LIMIT));
        }
        const response = await fetch(historyUrl.toString(), { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`History request failed with status ${response.status}`);
        }
        const entries = (await response.json()) as LatestReadingResponse[];
        if (cancelled) {
          return;
        }
        const normalized = Array.isArray(entries)
          ? entries.map(normalizeReading).filter((entry) => entry.side !== null)
          : [];
        normalized.sort((a, b) => parseTimestampMs(a) - parseTimestampMs(b));

        if (normalized.length > 0) {
          const derivedState = deriveActiveState(normalized);
          setActiveState(derivedState);
          setLatest(normalized[normalized.length - 1]);
        }
        setHistoryError(null);
      } catch (err) {
        if (!cancelled) {
          setHistoryError(err instanceof Error ? err.message : 'Failed to load device history');
        }
      } finally {
        if (!cancelled) {
          setHistoryReady(true);
        }
      }
    };

    loadHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const intervalId = window.setInterval(() => {
      setNowTick(Date.now());
    }, DURATION_TICK_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  const handleLatestReading = useCallback((payload: LatestReadingResponse) => {
    const normalized = normalizeReading(payload);
    if (normalized.side !== null) {
      const timestampMs = parseTimestampMs(normalized);
      setActiveState((prev) => {
        if (prev.side === normalized.side) {
          const startMs = prev.startMs !== null ? Math.min(prev.startMs, timestampMs) : timestampMs;
          const lastMs = prev.lastMs !== null ? Math.max(prev.lastMs, timestampMs) : timestampMs;
          return { side: normalized.side, startMs, lastMs };
        }
        return { side: normalized.side, startMs: timestampMs, lastMs: timestampMs };
      });
    }
    setLatest(normalized);
  }, []);

  useEffect(() => {
    if (!historyReady) {
      return;
    }
    let isMounted = true;

    const fetchLatest = async () => {
      try {
        const response = await fetch(API_ENDPOINT, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = (await response.json()) as LatestReadingResponse;
        if (!isMounted) {
          return;
        }
        handleLatestReading(payload);
        setLiveError(null);
      } catch (err) {
        if (isMounted) {
          setLiveError(err instanceof Error ? err.message : 'Unknown error');
        }
      }
    };

    fetchLatest();
    if (typeof window === 'undefined') {
      return () => {
        isMounted = false;
      };
    }
    const intervalId = window.setInterval(fetchLatest, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [handleLatestReading, historyReady]);

  const activeSide = activeState.side ?? latest?.side ?? null;
  const activeLabel = activeSide !== null ? resolveLabel(labels, activeSide) : null;
  const activeDurationMs = activeState.startMs !== null ? Math.max(0, nowTick - activeState.startMs) : null;
  const activeDurationText = !historyReady
    ? 'Calculating…'
    : activeDurationMs !== null
      ? formatDuration(activeDurationMs)
      : '—';
  const currentLabelValue = activeSide !== null ? labels[activeSide] ?? '' : '';
  const labelPlaceholder = activeSide !== null ? `${DEFAULT_LABEL_PREFIX} ${activeSide}` : 'Waiting for device…';

  const handleLabelChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (activeSide === null) {
        return;
      }
      const value = event.target.value;
      setLabels((prev) => ({
        ...prev,
        [activeSide]: value,
      }));
    },
    [activeSide],
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
          Dodecahedron Timesheet
        </Typography>

        {error && (
          <Alert severity="error" sx={{ maxWidth: 640 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} lg={7}>
            <DodecahedronVisualizer
              activeSide={activeSide}
              activeLabel={activeLabel}
              activeDurationText={activeDurationText}
              faceOrder={faceOrder}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box
              sx={{
                height: '100%',
                borderRadius: 3,
                p: { xs: 2.5, md: 3 },
                background: 'linear-gradient(150deg, rgba(14,20,35,0.85), rgba(20,32,52,0.92))',
                border: '1px solid rgba(111, 187, 255, 0.14)',
                backdropFilter: 'blur(18px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 600 }}>
                Current Side Label
              </Typography>
              <Typography variant="body2" sx={{ color: '#8ea0bb' }}>
                {activeSide !== null ? `Editing ${activeLabel}` : 'Waiting for device signal…'}
              </Typography>
              <TextField
                label="Custom label"
                placeholder={labelPlaceholder}
                value={currentLabelValue}
                onChange={handleLabelChange}
                disabled={activeSide === null}
                autoComplete="off"
                variant="outlined"
                InputLabelProps={{ sx: { color: '#a6b1c2' } }}
                inputProps={{ sx: { color: '#fff' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: '#fff' },
                    '&.Mui-focused fieldset': { borderColor: '#6ab8ff' },
                  },
                }}
              />
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="caption" sx={{ color: '#7f8ba5' }}>
                Saved locally to this browser.
              </Typography>
              <Typography variant="caption" sx={{ color: '#7f8ba5' }}>
                Active for: {activeDurationText}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          sx={{
            flexGrow: 1,
            minHeight: { xs: '70vh', md: 'calc(100vh - 280px)' },
          }}
        >
          <Box
            sx={{
              display: 'block',
              width: '100%',
              height: `${iframeHeight}px`,
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'transparent',
            }}
          >
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              title="Timesheet device dashboard"
              loading="lazy"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'transparent',
              }}
            />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

interface DodecahedronVisualizerProps {
  activeSide: number | null;
  activeLabel: string | null;
  activeDurationText: string;
  faceOrder?: number[] | undefined;
}

function DodecahedronVisualizer({ activeSide, activeLabel, activeDurationText, faceOrder }: DodecahedronVisualizerProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 320, sm: 380, md: 420 },
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid rgba(111,187,255,0.14)',
        background: 'radial-gradient(circle at top, rgba(24,42,69,0.9), rgba(9,14,24,0.95))',
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#0c1523']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 3]} intensity={1.3} />
          <pointLight position={[-4, -3, -5]} intensity={0.5} color="#3a5c8a" />
          <DodecahedronMesh activeSide={activeSide} faceOrder={faceOrder} />
        </Suspense>
      </Canvas>
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          px: 2,
          py: 1,
          borderRadius: 2,
          background: 'linear-gradient(120deg, rgba(7,12,21,0.85), rgba(14,24,38,0.9))',
          border: '1px solid rgba(111,187,255,0.24)',
          backdropFilter: 'blur(14px)',
          maxWidth: '80%',
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: '#7ea4ff', letterSpacing: 1.1, fontSize: 11, textTransform: 'uppercase' }}
        >
          Facing side
        </Typography>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>
          {activeLabel ?? 'Waiting for signal'}
        </Typography>
        <Typography variant="caption" sx={{ color: '#8ea0bb' }}>
          Active for: {activeDurationText}
        </Typography>
      </Box>
    </Box>
  );
}

interface DodecahedronMeshProps {
  activeSide: number | null;
  faceOrder?: number[] | undefined;
}

function DodecahedronMesh({ activeSide, faceOrder }: DodecahedronMeshProps) {
  const { geometry, faces, colorAttribute, edgesGeometry } = useMemo<DodecahedronData>(
    () => createDodecahedronData(faceOrder),
    [faceOrder],
  );

  const groupRef = useRef<THREE.Group>(null);
  const highlightRef = useRef<THREE.Mesh>(null);
  const targetQuaternion = useRef(new THREE.Quaternion());
  const frontVector = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      edgesGeometry.dispose();
    };
  }, [geometry, edgesGeometry, colorAttribute]);

  useEffect(() => {
    const highlightColor = new THREE.Color('#6ab8ff');
    faces.forEach((face) => {
      const [r, g, b] = face.baseColor;
      face.vertexIndices.forEach((idx) => {
        colorAttribute.setXYZ(idx, r, g, b);
      });
    });

    const activeFace = faces.find((face) => face.side === activeSide);
    if (activeFace) {
      activeFace.vertexIndices.forEach((idx) => {
        colorAttribute.setXYZ(idx, highlightColor.r, highlightColor.g, highlightColor.b);
      });
    }

    colorAttribute.needsUpdate = true;
  }, [activeSide, colorAttribute, faces]);

  useEffect(() => {
    const activeFace = faces.find((face) => face.side === activeSide);
    if (!activeFace) {
      return;
    }
    const quaternion = new THREE.Quaternion().setFromUnitVectors(activeFace.normal, frontVector);
    targetQuaternion.current.copy(quaternion);
  }, [activeSide, faces, frontVector]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const step = 1 - Math.exp(-delta * 6);
    group.quaternion.slerp(targetQuaternion.current, step);
    group.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.04;

    const highlight = highlightRef.current;
    if (highlight) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.05;
      highlight.scale.setScalar(pulse);
    }
  });

  const activeFace = faces.find((face) => face.side === activeSide) ?? null;

  return (
    <group ref={groupRef} dispose={null}>
      <mesh geometry={geometry}>
        <meshStandardMaterial vertexColors flatShading metalness={0.15} roughness={0.85} />
      </mesh>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#101a2a" />
      </lineSegments>
      {activeFace && (
        <mesh
          ref={highlightRef}
          position={activeFace.highlightPosition}
          quaternion={activeFace.quaternion}
        >
          <circleGeometry args={[0.68, 5]} />
          <meshBasicMaterial color="#6ab8ff" transparent opacity={0.28} />
        </mesh>
      )}
      {faces.map((face) => (
        <DreiText
          key={face.side}
          position={face.labelPosition}
          quaternion={face.quaternion}
          fontSize={0.22}
          color={activeSide === face.side ? '#ffffff' : '#90a0ba'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.004}
          outlineColor="rgba(12, 19, 32, 0.85)"
          renderOrder={10}
        >
          {face.side}
        </DreiText>
      ))}
    </group>
  );
}

function normalizeReading(payload: LatestReadingResponse): LatestReadingResponse {
  return {
    side: typeof payload.side === 'number' && Number.isFinite(payload.side) ? payload.side : null,
    imu_timestamp_text: payload.imu_timestamp_text ?? null,
    imu_timestamp_iso: payload.imu_timestamp_iso ?? null,
    received_at: payload.received_at ?? null,
    confidence: typeof payload.confidence === 'boolean' ? payload.confidence : null,
  };
}

function deriveActiveState(entries: LatestReadingResponse[]) {
  const state = { side: null as number | null, startMs: null as number | null, lastMs: null as number | null };
  for (const entry of entries) {
    if (entry.side === null) {
      continue;
    }
    const timestamp = parseTimestampMs(entry);
    if (state.side === entry.side && state.startMs !== null) {
      state.startMs = Math.min(state.startMs, timestamp);
      state.lastMs = state.lastMs !== null ? Math.max(state.lastMs, timestamp) : timestamp;
    } else {
      state.side = entry.side;
      state.startMs = timestamp;
      state.lastMs = timestamp;
    }
  }
  return state;
}

function parseTimestampMs(payload: LatestReadingResponse): number {
  const ordered = [payload.received_at, payload.imu_timestamp_iso];
  for (const value of ordered) {
    if (!value) continue;
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  if (payload.imu_timestamp_text) {
    const normalized = payload.imu_timestamp_text.replace(' ', 'T');
    const parsed = Date.parse(normalized);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return Date.now();
}

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

function createDodecahedronData(faceOrder?: number[] | undefined): DodecahedronData {
  const geometry = new THREE.DodecahedronGeometry(1.12, 0).toNonIndexed();
  geometry.computeVertexNormals();
  const position = geometry.attributes.position as THREE.BufferAttribute;

  const facesMap = new Map<string, { normal: THREE.Vector3; vertexIndices: number[] }>();

  const tempA = new THREE.Vector3();
  const tempB = new THREE.Vector3();
  const tempC = new THREE.Vector3();
  const crossHelper = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 3) {
    tempA.fromBufferAttribute(position, i);
    tempB.fromBufferAttribute(position, i + 1);
    tempC.fromBufferAttribute(position, i + 2);

    const normal = crossHelper
      .copy(tempB)
      .sub(tempA)
      .cross(tempC.clone().sub(tempA))
      .normalize();

    const key = `${Math.round(normal.x * 1000)},${Math.round(normal.y * 1000)},${Math.round(normal.z * 1000)}`;
    let face = facesMap.get(key);
    if (!face) {
      face = {
        normal: normal.clone(),
        vertexIndices: [],
      };
      facesMap.set(key, face);
    }
    face.vertexIndices.push(i, i + 1, i + 2);
  }

  const baseStart = new THREE.Color('#1f2b3f');
  const baseEnd = new THREE.Color('#2f4566');
  const frontVector = new THREE.Vector3(0, 0, 1);

  const facesUnordered = Array.from(facesMap.values()).map((faceData) => {
    const normal = faceData.normal.clone().normalize();
    const labelPosition = normal.clone().multiplyScalar(1.55).toArray() as [number, number, number];
    const highlightPosition = normal.clone().multiplyScalar(1.1).toArray() as [number, number, number];

    const mix = 0.35 + Math.max(0, normal.y) * 0.4;
    const faceColor = baseStart.clone().lerp(baseEnd, mix);

    return {
      normal,
      vertexIndices: faceData.vertexIndices.slice(),
      quaternion: new THREE.Quaternion().setFromUnitVectors(frontVector, normal),
      labelPosition,
      highlightPosition,
      baseColor: [faceColor.r, faceColor.g, faceColor.b] as [number, number, number],
    };
  });

  facesUnordered.sort((a, b) => {
    if (Math.abs(a.normal.z - b.normal.z) > 1e-4) {
      return b.normal.z - a.normal.z;
    }
    if (Math.abs(a.normal.y - b.normal.y) > 1e-4) {
      return b.normal.y - a.normal.y;
    }
    return a.normal.x - b.normal.x;
  });

  const sanitizedOrder = sanitizeFaceOrder(faceOrder, facesUnordered.length);
  const orderSequence = sanitizedOrder ?? facesUnordered.map((_, idx) => idx);

  const faces: FaceInfo[] = orderSequence.map((faceIndex, idx) => {
    const baseFace = facesUnordered[faceIndex];
    return {
      side: idx + 1,
      normal: baseFace.normal,
      vertexIndices: baseFace.vertexIndices.slice(),
      quaternion: baseFace.quaternion.clone(),
      labelPosition: [...baseFace.labelPosition] as [number, number, number],
      highlightPosition: [...baseFace.highlightPosition] as [number, number, number],
      baseColor: [...baseFace.baseColor] as [number, number, number],
    };
  });

  const colorAttribute = new THREE.BufferAttribute(new Float32Array(position.count * 3), 3);
  geometry.setAttribute('color', colorAttribute);
  const edgesGeometry = new THREE.EdgesGeometry(geometry);

  return { geometry, faces, colorAttribute, edgesGeometry };
}

function sanitizeFaceOrder(order: number[] | undefined, faceCount: number): number[] | undefined {
  if (!order || order.length !== faceCount) {
    return undefined;
  }

  const zeroBased = order.map((value) => {
    const idx = Number.isFinite(value) ? Math.floor(value) - 1 : -1;
    return idx;
  });

  if (zeroBased.some((idx) => idx < 0 || idx >= faceCount)) {
    return undefined;
  }

  const unique = new Set(zeroBased);
  if (unique.size !== faceCount) {
    return undefined;
  }

  return zeroBased;
}

function parseFaceOrder(raw?: string): number[] | undefined {
  if (!raw) return undefined;
  const parts = raw
    .split(',')
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value) => Number.isFinite(value));
  if (parts.length !== TOTAL_SIDES) {
    console.warn('VITE_DODECA_FACE_ORDER expects 12 comma-separated numbers. Ignoring override.');
    return undefined;
  }
  return parts;
}
