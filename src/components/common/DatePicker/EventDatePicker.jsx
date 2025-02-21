import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useTheme } from '@emotion/react';
import EventDatePickerCalendarHeader from './EventDatePickerCalendarHeader';
import EventDatePickerActionBar from './EventDatePickerActionBar';

/**
 * EventDatePicker component for single date picker
 * @param {boolean} disabled - disabled state
 * @param {Date} date - selected date
 * @param {string} label - label for the date picker
 * @param {function} onChange - change event for the date picker
 * @returns
 */
const EventDatePicker = ({ disabled = false, date, label, onChange }) => {
  const theme = useTheme();

  const handleDateChange = (newDateChange) => {
    if (!newDateChange) {
      return;
    }

    onChange(newDateChange.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        format="YYYY/MM/DD"
        disabled={disabled}
        value={date ? dayjs(date) : null}
        label={label}
        onChange={handleDateChange}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: '0.75rem',
          },

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.color.black[100]}`,
          },

          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: `${theme.color.black[900]}`,
              borderWidth: '1px',
            },
          },

          '& .MuiFormLabel-root': {
            color: `${theme.color.black[900]}`,

            '&.Mui-focused': {
              color: `${theme.color.black[900]}`,
            },
          },
        }}
        slots={{
          toolbar: null,
          calendarHeader: EventDatePickerCalendarHeader,
          actionBar: EventDatePickerActionBar,
        }}
        slotProps={{
          mobilePaper: {
            sx: {
              borderRadius: '1.5rem',

              '& .MuiDayCalendar-weekDayLabel': {
                fontSize: '0.875rem',
                color: theme.color.black[400],
              },
            },
          },
          day: {
            sx: {
              fontSize: '0.875rem',
              color: theme.color.black[600],

              '&:not(.Mui-selected)': {
                border: 'none',
              },

              '&:focus': {
                backgroundColor: 'transparent',

                '&.Mui-selected': {
                  backgroundColor: theme.color.main[100],
                },
              },

              '&.Mui-selected': {
                backgroundColor: theme.color.main[100],

                '&:hover': {
                  backgroundColor: theme.color.main[100],
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default EventDatePicker;
