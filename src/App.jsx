import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';
import LoginButton from './components/LoginButton';
import CalendarEvents from './components/CalendarEvents';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Brightness4, Brightness7, ExitToApp } from '@mui/icons-material';
import { googleLogout } from '@react-oauth/google';
import toast from 'react-hot-toast';

const App = () => {
  const dispatch = useDispatch();
  const { isSignedIn, user } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('preferredTheme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('preferredTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: darkMode ? '#1e88e5' : '#1976d2',
            dark: darkMode ? '#1565c0' : '#115293',
          },
          secondary: {
            main: darkMode ? '#006400' : '#dc004e',
            dark: darkMode ? '#c2185b' : '#a30043',
          },
          background: {
            default: darkMode ? '#121212' : '#f0f2f5',
            paper: darkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      }),
    [darkMode]
  );

  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
    toast.success('Successfully logged out.');
  };

  const handleThemeChange = () => {
    setDarkMode((prev) => !prev);
    const mode = darkMode ? 'light' : 'dark';
    toast.success(`Switched to ${mode} mode.`, {
      icon: mode === 'dark' ? <Brightness4 /> : <Brightness7 />,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Google Calendar Events
          </Typography>
          {isSignedIn && (
            <Box display="flex" alignItems="center">
              <Tooltip title="Toggle light/dark theme">
                <IconButton color="inherit" onClick={handleThemeChange}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign Out">
                <IconButton color="inherit" onClick={handleLogout}>
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        {!isSignedIn ? (
          <LoginButton />
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom>
              Welcome, {user.name}
            </Typography>
            <CalendarEvents />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
