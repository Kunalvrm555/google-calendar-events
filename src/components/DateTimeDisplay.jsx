// src/components/DateTimeDisplay.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const DateTimeDisplay = ({ dateTime }) => {
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  return (
    <Box>
      <Typography variant="body1" fontWeight="bold">
        {formattedDate}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {formattedTime}
      </Typography>
    </Box>
  );
};

export default DateTimeDisplay;
