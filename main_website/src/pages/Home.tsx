import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { BarChart, Code, Memory } from '@mui/icons-material';

export function Home() {
  const [thisWeekSteps, setThisWeekSteps] = useState('—');
  const [lastWeekSteps, setLastWeekSteps] = useState('—');

  useEffect(() => {
    (async () => {
      const envEndpoint = import.meta.env.VITE_ACTIVITY_PUBLIC_URL;
      const defaultEndpoint = 'https://activity.tesseract.sbs/public/steps';
      const localEndpoint = import.meta.env.DEV ? 'http://localhost:4000/public/steps' : undefined;
      const sources = [envEndpoint, localEndpoint, defaultEndpoint].filter(
        (value): value is string => Boolean(value && value.length > 0)
      );
      for (const url of sources) {
        try {
          const res = await fetch(url, { credentials: 'omit' });
          if (!res.ok) continue;
          const d = await res.json();
          const n = (x: string | number) => Number(x || 0).toLocaleString();
          setThisWeekSteps(n(d?.thisWeek?.steps ?? d?.week?.steps));
          setLastWeekSteps(n(d?.lastWeek?.steps));
          return;
        } catch {
          // try next source
        }
      }
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ bgcolor: 'background.paper', py: 8, borderRadius: 2, mb: 4 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <Typography variant="h2" component="h1" gutterBottom>
                    Builds, data & side-projects
                  </Typography>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <Typography variant="h5" color="text.secondary" paragraph>
                    Personal hub for experiments, activity insights, and electronics. Minimal, fast, and privacy-friendly.
                  </Typography>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                  <Button variant="contained" color="primary" component={Link} to="/activity" sx={{ mr: 2 }}>
                    Open Activity Dashboard
                  </Button>
                  <Button variant="outlined" color="secondary" component={Link} to="/portfolio">
                    See Portfolio
                  </Button>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">This week</Typography>
                    <Typography variant="h3" color="primary">{thisWeekSteps}</Typography>
                    <Typography color="text.secondary" gutterBottom>Mon → Sun</Typography>
                    <Typography variant="h5" component="div" sx={{ mt: 2 }}>Last week</Typography>
                    <Typography variant="h3" color="primary">{lastWeekSteps}</Typography>
                    <Typography color="text.secondary">Prev Mon → Sun</Typography>
                    <Button size="small" component={Link} to="/activity" sx={{ mt: 2 }}>Live stats →</Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <BarChart sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>🏃‍♂️ Activity tracker</Typography>
                <Typography color="text.secondary" paragraph>Daily steps, active kcal, workouts — private dashboard behind auth.</Typography>
                <Button size="small" component={Link} to="/activity">Open dashboard →</Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Code sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>🧰 Portfolio</Typography>
                <Typography color="text.secondary" paragraph>Projects, write-ups, and small tools I tinker with.</Typography>
                <Button size="small" component={Link} to="/portfolio">View portfolio →</Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Memory sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>🔧 Electronic projects</Typography>
                <Typography color="text.secondary" paragraph>PCBs, microcontrollers, sensors, and logs from the bench.</Typography>
                <Button size="small" component={Link} to="/electronics">Explore builds →</Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}
