import { Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of the first project. It showcases my skills in React and Material-UI.',
    tags: ['React', 'Material-UI', 'TypeScript'],
  },
  {
    title: 'Project Two',
    description: 'A brief description of the second project. It involves a Node.js backend and a PostgreSQL database.',
    tags: ['Node.js', 'PostgreSQL', 'Express'],
  },
  {
    title: 'Project Three',
    description: 'A brief description of the third project. This one is a mobile app built with React Native.',
    tags: ['React Native', 'iOS', 'Android'],
  },
];

export function Portfolio() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Portfolio
      </Typography>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div">{project.title}</Typography>
                  <Typography color="text.secondary" paragraph>{project.description}</Typography>
                  <div>
                    {project.tags.map((tag, i) => (
                      <Chip label={tag} key={i} sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}