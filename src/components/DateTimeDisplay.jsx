// src/components/DateTimeDisplay.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DateTimeDisplay = ({ dateTime }) => {
  const theme = useTheme();
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Box>
      <Typography
        variant="body1"
        fontWeight="bold"
        color={theme.palette.text.primary}
      >
        {formattedDate}
      </Typography>
      <Typography
        variant="body2"
        color={theme.palette.text.secondary}
      >
        {formattedTime}
      </Typography>
    </Box>
  );
};

export default DateTimeDisplay;
