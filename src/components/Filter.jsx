// src/components/Filter.jsx
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Filter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterClick = () => {
    if (startDate && endDate) {
      onFilter(startDate, endDate);
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    onFilter(new Date('1970-01-01'), new Date());
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
        >
          Apply Filter
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default Filter;
