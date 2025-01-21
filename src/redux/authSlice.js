// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignedIn: false,
    user: {},
    accessToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log('Setting user data:', action.payload);
      state.isSignedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      console.log('Logging out user.');
      state.isSignedIn = false;
      state.user = {};
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
