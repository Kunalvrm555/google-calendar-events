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
  Skeleton,
} from '@mui/material';
import DateTimeDisplay from './DateTimeDisplay';
import { useTheme } from '@mui/material/styles';

const EventTable = ({ events, loading }) => {
  const theme = useTheme();

  // Sort events by start date descending
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.start.dateTime || a.start.date);
    const dateB = new Date(b.start.dateTime || b.start.date);
    return dateB - dateA;
  });

  // Define the number of skeleton rows
  const skeletonRows = 5;

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        marginTop: 4,
        boxShadow: theme.shadows[5],
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.dark
                  : theme.palette.grey[200],
            }}
          >
            <TableCell
              sx={{
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                width: '25%',
              }}
            >
              Event Title
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                width: '25%',
              }}
            >
              Start Time
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                width: '25%',
              }}
            >
              End Time
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.text.primary,
                width: '25%',
              }}
            >
              Location
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? Array.from(new Array(skeletonRows)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                </TableRow>
              ))
            : sortedEvents.map((event, index) => (
                <TableRow
                  key={event.id}
                  hover
                  sx={{
                    backgroundColor:
                      index % 2 === 0
                        ? theme.palette.action.hover
                        : theme.palette.background.default,
                    cursor: 'pointer',
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
