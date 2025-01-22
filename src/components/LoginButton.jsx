import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import toast from 'react-hot-toast'; // Import toast

const LoginButton = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      try {
        const accessToken = tokenResponse.access_token;
        console.log('Access Token:', accessToken);

        if (!accessToken) {
          console.error('No access token found in tokenResponse.');
          toast.error('Authentication failed. Please try again.');
          return;
        }

        // Fetch user info
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('User Info:', userInfoResponse.data);

        dispatch(
          setUser({
            user: {
              name: userInfoResponse.data.name,
              email: userInfoResponse.data.email,
              picture: userInfoResponse.data.picture,
            },
            accessToken: accessToken,
          })
        );
        console.log('User data set in Redux store.');
        toast.success(`Welcome, ${userInfoResponse.data.name}!`);
      } catch (error) {
        console.error('Error fetching user info:', error);
        toast.error('Failed to fetch user information.');
      }
    },
    onError: () => {
      console.log('Login Failed');
      toast.error('Login failed. Please try again.');
    },
    flow: 'implicit', // Explicitly set to implicit flow
    scope: 'https://www.googleapis.com/auth/calendar.readonly email profile openid',
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={() => login()}
        color="primary"
        size="large"
        sx={{
          padding: '0.8rem 2rem',
          fontSize: '1.2rem',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default LoginButton;
