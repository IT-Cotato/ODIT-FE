import { Chip, useTheme } from '@mui/material';
import React from 'react';

const FilterChip = ({ checked, label, onClick }) => {
  const theme = useTheme();

  return (
    <Chip
      clickable
      checked={checked}
      label={label}
      onClick={onClick}
      sx={{
        '&.MuiChip-root': {
          padding: '0.625rem 1rem',
          borderRadius: '1.25rem',
          height: 'auto',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: checked ? theme.color.main[100] : theme.color.black[100],
          backgroundColor: checked ? theme.color.main[5] : theme.color.black[0],
          color: checked ? theme.color.main[100] : theme.color.black[900],
        },

        '& .MuiChip-label': {
          padding: 0,
          fontSize: '0.875rem',
          fontWeight: checked ? '700' : '400',
        },
      }}
    />
  );
};

export default FilterChip;
