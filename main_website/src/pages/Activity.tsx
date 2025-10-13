// @ts-nocheck
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert, TextField, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const AUTH_STORAGE_KEY = 'activity-basic-auth';
const CHART_RANGE_OPTIONS = [
  { value: '7d', label: 'Last 7 Days' },
  { value: 'month', label: 'Current Month' },
  { value: 'year', label: 'Current Year' },
  { value: 'all', label: 'All Time' },
] as const;
// Define the types for the data
interface DayStats {
  date: string;
  steps: number;
  activeKcal: number;
  totalKcal: number;
  workoutCount: number;
  workoutMinutes: number;
  workoutNames: string[];
}

// Helper function to format date
function ddmmyyyy(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function loadStoredAuth() {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { token?: string; username?: string };
    if (!parsed || typeof parsed.token !== 'string' || parsed.token.length === 0) {
      return null;
    }
    return {
      token: parsed.token,
      username: typeof parsed.username === 'string' ? parsed.username : '',
    };
  } catch (_err) {
    return null;
  }
}

function persistAuth(value: { token: string; username: string } | null) {
  if (typeof window === 'undefined') {
    return;
  }
  if (value && value.token) {
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
  } else {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

const initialStoredAuth = loadStoredAuth();

export function Activity() {
  const [data, setData] = useState<DayStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(() => !initialStoredAuth?.token);
  const [authFormError, setAuthFormError] = useState<string | null>(null);
  const [auth, setAuth] = useState<{ token: string; username: string } | null>(() => initialStoredAuth);
  const [authForm, setAuthForm] = useState(() => ({
    username: initialStoredAuth?.username ?? '',
    password: '',
  }));
  const [chartRange, setChartRange] = useState<(typeof CHART_RANGE_OPTIONS)[number]['value']>('7d');
  const authUsernameInput = authForm.username;
  const authPasswordInput = authForm.password;

  const activityApiUrl = import.meta.env.VITE_ACTIVITY_API_URL || '/api/activity/daily';
  const authToken = auth?.token ?? null;

  const handleAuthFieldChange = useCallback(
    (field: 'username' | 'password') => (event) => {
      const value = event.target.value;
      setAuthForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  useEffect(() => {
    persistAuth(auth);
  }, [auth]);

  useEffect(() => {
    if (authToken) {
      setNeedsAuth(false);
    }
  }, [activityApiUrl, authToken]);

  const handleAuthSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!authUsernameInput || !authPasswordInput) {
        setAuthFormError('Username and password are required.');
        return;
      }
      try {
        const token = typeof window !== 'undefined'
          ? window.btoa(`${authUsernameInput}:${authPasswordInput}`)
          : Buffer.from(`${authUsernameInput}:${authPasswordInput}`).toString('base64');
        setAuth({ token, username: authUsernameInput });
        setAuthFormError(null);
        setNeedsAuth(false);
        setAuthForm((prev) => ({ ...prev, password: '' }));
        setError(null);
      } catch (encodingError) {
        console.error('Failed to encode credentials', encodingError);
        setAuthFormError('Unable to encode credentials. Please retry.');
      }
    },
    [authPasswordInput, authUsernameInput],
  );

  const handleSignOut = useCallback(() => {
    setAuth(null);
    setAuthForm({ username: '', password: '' });
    setNeedsAuth(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function getData() {
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (authToken) {
          headers['x-activity-basic-auth'] = authToken.startsWith('Basic ')
            ? authToken
            : `Basic ${authToken}`;
        }
        const res = await fetch(activityApiUrl, { headers });
        if (!res.ok) {
          if (res.status === 401) {
            if (!cancelled) {
              setNeedsAuth(true);
              setAuthFormError(authToken ? 'Invalid credentials. Please try again.' : 'Authentication is required to view activity data.');
              setAuthForm((prev) => ({ ...prev, password: '' }));
              setAuth(null);
              setError(null);
            }
            return;
          }
          if (res.status === 502) {
            throw new Error('Activity service is unavailable (502). Please ensure the tracker backend is online.');
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const jsonData = await res.json();
        if (cancelled) {
          return;
        }
        const sortedData = [...jsonData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setData(sortedData);
        setNeedsAuth(false);
        setAuthFormError(null);
        setError(null);
      } catch (fetchError) {
        if (cancelled) {
          return;
        }
        if (fetchError instanceof TypeError) {
          setError('Network error while requesting activity data. Please try again shortly.');
        } else {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : 'Failed to fetch activity data. The dashboard might be offline.',
          );
        }
        console.error('Failed to fetch data:', fetchError);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    getData();

    return () => {
      cancelled = true;
    };
  }, [activityApiUrl, authToken]);

  const filteredData = useMemo(() => {
    if (data.length === 0) {
      return [];
    }
    const sorted = data.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const referenceDate = new Date(sorted[sorted.length - 1].date);

    switch (chartRange) {
      case 'all':
        return sorted;
      case '7d':
        return sorted.slice(-7);
      case 'month':
        return sorted.filter((entry) => {
          const current = new Date(entry.date);
          return current.getFullYear() === referenceDate.getFullYear() && current.getMonth() === referenceDate.getMonth();
        });
      case 'year':
        return sorted.filter((entry) => {
          const current = new Date(entry.date);
          return current.getFullYear() === referenceDate.getFullYear();
        });
      default:
        return sorted;
    }
  }, [chartRange, data]);

  const labels = filteredData.map((r) => ddmmyyyy(r.date));
  const activeRangeLabel = useMemo(
    () => CHART_RANGE_OPTIONS.find((option) => option.value === chartRange)?.label ?? '',
    [chartRange],
  );

  const stepsChartData = {
    labels,
    datasets: [{
      label: 'Steps',
      data: filteredData.map(r => r.steps || 0),
      borderColor: '#5aa6ff',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(90,166,255,0.35)');
        gradient.addColorStop(1, 'rgba(90,166,255,0.02)');
        return gradient;
      },
      pointRadius: 2,
      borderWidth: 2,
      tension: 0.3,
      fill: true
    }]
  };

  const kcalChartData = {
    labels,
    datasets: [
      { label: 'Active kcal', data: filteredData.map(r => r.activeKcal || 0), backgroundColor: '#4ac7a5' },
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: false } },
    scales: {
      x: { ticks: { color: '#a6b1c2' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#a6b1c2' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
  }

   const authSection = needsAuth ? (
     <Box
       component={motion.div}
       initial={{ opacity: 0.8 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.3 }}
       sx={{
         borderRadius: 3,
         border: '1px solid rgba(255,255,255,0.1)',
         background: 'rgba(15,20,32,0.75)',
         p: { xs: 2.5, md: 3 },
         maxWidth: 520,
         mx: 'auto',
         mt: 4,
       }}
     >
       <Typography variant="h5" sx={{ color: '#fff', mb: 1.5 }}>
         Activity Dashboard Sign-in
       </Typography>
       <Typography variant="body2" sx={{ color: '#a6b1c2', mb: 2 }}>
         Enter the basic-auth credentials for the activity tracker service to load your data.
       </Typography>
      <Box component="form" onSubmit={handleAuthSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          value={authUsernameInput}
          onChange={handleAuthFieldChange('username')}
           autoComplete="username"
           InputLabelProps={{ sx: { color: '#a6b1c2' } }}
           inputProps={{ sx: { color: '#fff' } }}
           fullWidth
           variant="outlined"
           sx={{
             '& .MuiOutlinedInput-root': {
               '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
               '&:hover fieldset': { borderColor: '#fff' },
               '&.Mui-focused fieldset': { borderColor: '#6ab8ff' },
             },
           }}
         />
        <TextField
          label="Password"
          type="password"
          value={authPasswordInput}
          onChange={handleAuthFieldChange('password')}
           autoComplete="current-password"
           InputLabelProps={{ sx: { color: '#a6b1c2' } }}
           inputProps={{ sx: { color: '#fff' } }}
           fullWidth
           variant="outlined"
           sx={{
             '& .MuiOutlinedInput-root': {
               '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
               '&:hover fieldset': { borderColor: '#fff' },
               '&.Mui-focused fieldset': { borderColor: '#6ab8ff' },
             },
           }}
         />
         {authFormError && (
           <Alert severity="error" sx={{ backgroundColor: 'rgba(255,0,0,0.08)' }}>
             {authFormError}
           </Alert>
         )}
         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
           <Button
             variant="outlined"
             color="inherit"
             onClick={handleSignOut}
             sx={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
           >
             Clear
           </Button>
           <Button
             type="submit"
             variant="contained"
             sx={{
               background: 'linear-gradient(120deg, #5aa6ff, #6dd5ff)',
               color: '#0b1020',
               fontWeight: 600,
             }}
           >
             Authenticate
           </Button>
         </Stack>
       </Box>
     </Box>
   ) : null;

   if (error && !needsAuth) {
     return <Alert severity="error" sx={{ m: 4 }}>{error}</Alert>;
   }

   return (
     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
       <Box sx={{ p: { xs: 2, md: 4 } }}>
         <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
           Activity Dashboard
         </Typography>
        {authSection}
        {!needsAuth && (
          <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }}>
              {CHART_RANGE_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  size="small"
                  variant={chartRange === option.value ? 'contained' : 'outlined'}
                  onClick={() => setChartRange(option.value)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: chartRange === option.value ? 'transparent' : 'rgba(255,255,255,0.25)',
                    background:
                      chartRange === option.value
                        ? 'linear-gradient(120deg, #5aa6ff, #6dd5ff)'
                        : 'rgba(15,20,32,0.7)',
                    color: chartRange === option.value ? '#0b1020' : '#fff',
                    '&:hover': {
                      background:
                        chartRange === option.value
                          ? 'linear-gradient(120deg, #5aa6ff, #6dd5ff)'
                          : 'rgba(15,20,32,0.85)',
                    },
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Box sx={{ p: 0 }}>
                  <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                    Steps <Typography component="span" variant="subtitle2" sx={{ color: '#a6b1c2', ml: 1 }}>{activeRangeLabel}</Typography>
                  </Typography>
                  <Box sx={{ height: { xs: 260, md: 360 } }}>
                    <Line options={chartOptions} data={stepsChartData} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box sx={{ p: 0 }}>
                  <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                    Active Kcal <Typography component="span" variant="subtitle2" sx={{ color: '#a6b1c2', ml: 1 }}>{activeRangeLabel}</Typography>
                  </Typography>
                  <Box sx={{ height: { xs: 260, md: 360 } }}>
                    <Bar options={chartOptions} data={kcalChartData} />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <TableContainer sx={{ maxHeight: 'calc(100vh - 520px)' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ bgcolor: 'transparent', color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                      <TableCell align="right" sx={{ bgcolor: 'transparent', color: '#fff', fontWeight: 'bold' }}>Steps</TableCell>
                      <TableCell align="right" sx={{ bgcolor: 'transparent', color: '#fff', fontWeight: 'bold' }}>Active kcal</TableCell>
                      <TableCell align="right" sx={{ bgcolor: 'transparent', color: '#fff', fontWeight: 'bold' }}>Workouts</TableCell>
                      <TableCell align="right" sx={{ bgcolor: 'transparent', color: '#fff', fontWeight: 'bold' }}>Mins</TableCell>
                      <TableCell sx={{ bgcolor: 'transparent', color: '#fff', fontWeight: 'bold' }}>Workout Names</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.slice().reverse().map((row) => (
                      <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" sx={{ color: '#fff', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>
                          {ddmmyyyy(row.date)}
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#5aa6ff', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>{row.steps.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ color: '#4ac7a5', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>{row.activeKcal.toLocaleString()}</TableCell>
                        <TableCell align="right" sx={{ color: '#ff7b72', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>{row.workoutCount}</TableCell>
                        <TableCell align="right" sx={{ color: '#fff', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>{row.workoutMinutes.toFixed(1)}</TableCell>
                        <TableCell sx={{ color: '#a6b1c2', borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>{row.workoutNames.join(', ')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
    </motion.div>
  );
}
