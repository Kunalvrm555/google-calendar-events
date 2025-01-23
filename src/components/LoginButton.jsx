import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import GoogleIcon from '../assets/google.svg';
import toast from 'react-hot-toast';

const LoginButton = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        if (!accessToken) {
          toast.error('Authentication failed. Please try again.');
          return;
        }

        // Fetch user info
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        dispatch(setUser({
          user: {
            name: userInfoResponse.data.name,
            email: userInfoResponse.data.email,
            picture: userInfoResponse.data.picture,
          },
          accessToken: accessToken,
        }));
        toast.success(`Welcome, ${userInfoResponse.data.name}!`);
      } catch (error) {
        toast.error('Failed to fetch user information.');
      }
    },
    onError: () => {
      toast.error('Login failed. Please try again.');
    },
    flow: 'implicit', // Explicitly set to implicit flow
    scope: 'https://www.googleapis.com/auth/calendar.readonly email profile openid',
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
      <Button
        variant="contained"
        onClick={() => login()}
        color="primary"
        size="large"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.8rem 1rem',
          fontSize: '1.2rem',
          borderRadius: '100px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: 'primary.dark',
          },
          gap: '10px',
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'white',
          borderRadius: '50%',
          p: '6px',
          mr: 1,
        }}>
          <Box
            component="img"
            src={GoogleIcon}
            alt="Google"
            sx={{ height: 40, width: 40 }}
          />
        </Box>
        Sign in with Google
      </Button>
    </Box>
  );
};

export default LoginButton;
