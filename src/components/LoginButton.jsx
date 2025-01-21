// src/components/LoginButton.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

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
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => {
      console.log('Login Failed');
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
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default LoginButton;
