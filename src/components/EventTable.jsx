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
          <TableRow>
            <TableCell>Event Title</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.summary || 'No Title'}</TableCell>
              <TableCell>
                {new Date(event.start.dateTime || event.start.date).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(event.end.dateTime || event.end.date).toLocaleString()}
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
