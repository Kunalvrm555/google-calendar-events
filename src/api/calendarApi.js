// src/api/calendarApi.js
import axios from 'axios';

export const fetchCalendarEvents = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          singleEvents: true,
          orderBy: 'startTime',
          timeMin: new Date().toISOString(),
          maxResults: 2500,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};
