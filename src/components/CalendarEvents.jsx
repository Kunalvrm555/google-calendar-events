import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarEvents } from '../redux/calendarSlice';
import EventTable from './EventTable';
import Filter from './Filter';
import { Typography, Box, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

const CalendarEvents = () => {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.calendar);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    if (status === 'idle' && accessToken) {
      dispatch(getCalendarEvents(accessToken));
    }
  }, [status, dispatch, accessToken]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleFilter = (startDate, endDate) => {
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
    setFilteredEvents(filtered);
    toast.success(`${filtered.length} event(s) found.`);
  };

  const handleRefetch = () => {
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

  if (status === 'failed') {
    content = (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  } else {
    content = (
      <>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefetch}
            color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
            sx={{
              padding: '0.6rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
            }}
          >
            Refetch Events
          </Button>
        </Box>
        <Filter onFilter={handleFilter} />
        <EventTable events={filteredEvents} loading={status === 'loading'} />
      </>
    );
  }

  return <div>{content}</div>;
};

export default CalendarEvents;
