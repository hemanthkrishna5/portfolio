import { Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';



export function Electronics() {
  const iframeSrc = import.meta.env.VITE_TIMESHEET_IFRAME_URL ?? '/timesheet-app/';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Dodecahedron Timesheet
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This is a live dashboard for a project that tracks the orientation of a 3D-printed dodecahedron with an embedded IMU.
          The device streams its orientation data in real-time, and the dashboard below visualizes the current state.
        </Typography>
        <Paper elevation={3} sx={{ p: 2, mt: 4, background: 'none' }}>
          <iframe src={iframeSrc} style={{ width: '100%', height: '600px', border: 'none' }} />
        </Paper>
      </Box>
    </motion.div>
  );
}
