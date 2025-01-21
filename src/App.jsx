// src/App.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/authSlice';
import LoginButton from './components/LoginButton';
import CalendarEvents from './components/CalendarEvents';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { googleLogout } from '@react-oauth/google';

const App = () => {
  const dispatch = useDispatch();
  const { isSignedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            WhiteCarrot.io - Google Calendar App
          </Typography>
          {isSignedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        {!isSignedIn ? (
          <LoginButton />
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Welcome, {user.name}
            </Typography>
            <CalendarEvents />
          </>
        )}
      </Container>
    </>
  );
};

export default App;
