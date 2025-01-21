// src/components/EventTable.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DateTimeDisplay from './DateTimeDisplay'; // Import the new component

const EventTable = ({ events }) => {
  console.log('Rendering EventTable with events:', events.length);

  // Sort events by start date descending
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.start.dateTime || a.start.date);
    const dateB = new Date(b.start.dateTime || b.start.date);
    return dateB - dateA;
  });

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><strong>Event Title</strong></TableCell>
            <TableCell><strong>Start Time</strong></TableCell>
            <TableCell><strong>End Time</strong></TableCell>
            <TableCell><strong>Location</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEvents.map((event) => (
            <TableRow
              key={event.id}
              hover
              sx={{
                cursor: 'pointer',
                '&:nth-of-type(even)': {
                  backgroundColor: '#fafafa',
                },
              }}
            >
              <TableCell>{event.summary || 'No Title'}</TableCell>
              <TableCell>
                <DateTimeDisplay dateTime={event.start.dateTime || event.start.date} />
              </TableCell>
              <TableCell>
                <DateTimeDisplay dateTime={event.end.dateTime || event.end.date} />
              </TableCell>
              <TableCell>{event.location || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
