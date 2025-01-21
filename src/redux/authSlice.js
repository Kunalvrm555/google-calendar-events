// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper functions to interact with localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        isSignedIn: false,
        user: {},
        accessToken: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load auth state from localStorage:', err);
    return {
      isSignedIn: false,
      user: {},
      accessToken: null,
    };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Failed to save auth state to localStorage:', err);
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('Setting user data:', action.payload);
      state.isSignedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      saveState(state); // Save to localStorage
    },
    logout: (state) => {
      console.log('Logging out user.');
      state.isSignedIn = false;
      state.user = {};
      state.accessToken = null;
      saveState(state); // Save to localStorage
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
