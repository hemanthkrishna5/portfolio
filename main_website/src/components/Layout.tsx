// @ts-nocheck
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

export function Layout() {
  const location = useLocation();
  const fullBleed = location.pathname.startsWith('/activity') || location.pathname.startsWith('/electronics');
  const year = new Date().getFullYear();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const containerPadding = fullBleed ? 0 : isMdUp ? 8 : 6;
  const innerPadding = fullBleed ? 0 : isMdUp ? 6 : 2.5;

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(18, 24, 38, 0.7)',
          backdropFilter: 'blur(8px)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
              <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                tesseract.sbs
              </NavLink>
            </motion.div>
          </Typography>
          <Button color="inherit" component={NavLink} to="/" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>Home</Button>
          <Button color="inherit" component={NavLink} to="/activity" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>Activity tracker</Button>
          <Button color="inherit" component={NavLink} to="/portfolio" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>Portfolio</Button>
          <Button color="inherit" component={NavLink} to="/electronics" sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' } }}>Electronic projects</Button>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth={false}
        disableGutters={fullBleed}
        sx={{
          flexGrow: 1,
          py: containerPadding
        } as any}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            px: innerPadding,
            mx: 'auto'
          } as any}
        >
          <Outlet />
        </Box>
      </Container>
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2, mt: 'auto' }}>
        <Container>
          <Typography variant="body2" color="text.secondary" align="center">
            © {year} tesseract.sbs | Built with electrons and nucleus
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
