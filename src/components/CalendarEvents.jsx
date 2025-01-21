// src/components/CalendarEvents.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarEvents } from '../redux/calendarSlice';
import EventTable from './EventTable';
import Filter from './Filter';
import { Typography, CircularProgress, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import toast from 'react-hot-toast'; // Import toast

const CalendarEvents = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.calendar);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (status === 'idle' && accessToken) {
      console.log('Dispatching getCalendarEvents with accessToken:', accessToken);
      dispatch(getCalendarEvents(accessToken));
    }
  }, [status, dispatch, accessToken]);

  useEffect(() => {
    console.log('Updating filtered events.');
    setFilteredEvents(events);
  }, [events]);

  const handleFilter = (startDate, endDate) => {
    console.log('Applying filter:', startDate, endDate);
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
    console.log('Filtered events count:', filtered.length);
    setFilteredEvents(filtered);
    toast.success(`${filtered.length} event(s) found.`);
  };

  const handleRefetch = () => {
    console.log('Refetch button clicked. Fetching latest events.');
    dispatch(getCalendarEvents(accessToken))
      .unwrap()
      .then(() => {
        toast.success('Events successfully refreshed.');
      })
      .catch(() => {
        toast.error('Failed to refresh events.');
      });
  };

  let content;

  if (status === 'loading') {
    content = (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  } else if (status === 'succeeded') {
    content = (
      <>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefetch}
            color="info"
            sx={{
              padding: '0.6rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            Refetch Events
          </Button>
        </Box>
        <Filter onFilter={handleFilter} />
        <EventTable events={filteredEvents} />
      </>
    );
  } else if (status === 'failed') {
    content = (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return <div>{content}</div>;
};

export default CalendarEvents;
