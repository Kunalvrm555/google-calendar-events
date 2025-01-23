import React, { useState } from 'react';
import { Box, Button, TextField, useTheme } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import toast from 'react-hot-toast';

const Filter = ({ onFilter, resetFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const theme = useTheme();

  const handleFilterClick = () => {
    if (startDate && endDate) {
      onFilter(startDate, endDate);
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    resetFilter(); 
    toast.success('Filters reset.');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          variant="contained"
          onClick={handleFilterClick}
          disabled={!startDate || !endDate}
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
          sx={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.primary.dark,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0px 6px 16px rgba(255, 255, 255, 0.15)' 
                : '0px 6px 16px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          Apply Filter
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
          sx={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.primary.light,
              boxShadow: theme.palette.mode === 'dark' 
                ? '0px 6px 16px rgba(255, 255, 255, 0.15)' 
                : '0px 6px 16px rgba(0, 0, 0, 0.15)',
              borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary.dark : theme.palette.primary.dark,
            },
          }}
        >
          Reset
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default Filter;
