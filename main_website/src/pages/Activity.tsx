import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

export function Activity() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Activity Tracker
          </Typography>
          <iframe src="/activity-tracker/" style={{ width: '100%', height: '800px', border: 'none' }} />
        </CardContent>
      </Card>
    </motion.div>
  );
}