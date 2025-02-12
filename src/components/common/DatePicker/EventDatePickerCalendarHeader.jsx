import React from 'react';
import { Box, Button } from '@mui/material';
import { ReactComponent as ChevronLeftIcon } from '../../../assets/icons/chevron_l_20_(1_5).svg';
import { ReactComponent as ChevronRightIcon } from '../../../assets/icons/chevron_r_20_(1_5).svg';

const EventDatePickerCalendarHeader = (props) => {
  const { className, currentMonth, onMonthChange } = props;

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '1.125rem',
        fontWeight: 600,
        paddingTop: '1.25rem',
        paddingBottom: '0.875rem',
        px: '1.5rem',
      }}
    >
      <Button onClick={() => onMonthChange(currentMonth.subtract(1, 'month'), 'right')}>
        <ChevronLeftIcon />
      </Button>
      {currentMonth.format('YYYY년 MM월')}
      <Button onClick={() => onMonthChange(currentMonth.add(1, 'month'), 'left')}>
        <ChevronRightIcon />
      </Button>
    </Box>
  );
};

export default EventDatePickerCalendarHeader;
