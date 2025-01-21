// src/redux/calendarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCalendarEvents } from '../api/calendarApi';

export const getCalendarEvents = createAsyncThunk(
  'calendar/getCalendarEvents',
  async (accessToken, { rejectWithValue }) => {
    try {
      console.log('Fetching calendar events with access token:', accessToken);
      const events = await fetchCalendarEvents(accessToken);
      console.log('Calendar events fetched:', events);
      return events;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch events.');
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCalendarEvents.pending, (state) => {
        console.log('Fetching calendar events...');
        state.status = 'loading';
      })
      .addCase(getCalendarEvents.fulfilled, (state, action) => {
        console.log('Calendar events successfully fetched.');
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(getCalendarEvents.rejected, (state, action) => {
        console.error('Failed to fetch calendar events:', action.payload);
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default calendarSlice.reducer;
