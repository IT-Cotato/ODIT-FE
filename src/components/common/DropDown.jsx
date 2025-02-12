import React from 'react';
import { styled, TextField, useTheme, FormControl, Typography, MenuItem } from '@mui/material';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron_d_24_1_5.svg';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '21rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  background: theme.color.black[0],
  borderRadius: '0.75rem',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  height: '3.5rem',

  '& .Mui-disabled': {
    '-webkit-text-fill-color': theme.color.black[400],
    background: theme.color.black[30],
    borderRadius: '0.75rem',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0.75rem',
    borderColor: theme.color.black[100],
  },

  '&:hover fieldset': {
    borderColor: theme.color.black[900],
  },

  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.color.black[900],
      borderWidth: '1px',
    },
  },

  '& .MuiInputBase-input': {
    fontSize: '1rem',
  },
}));

/**
 * DropDown component
 * @param {string} value - selected value (code must be included in items)
 * @param {object} items - items to be displayed ({coe: name})
 * @param {string} label - label for the dropdown
 * @param {function} onChange - change event for the dropdown
 * @returns
 */
const DropDown = ({ value, items, label, onChange }) => {
  const theme = useTheme();

  return (
    <StyledFormControl>
      {label && (
        <Typography
          sx={{
            color: theme.color.black[900],
            fontWeight: 600,
            px: '0.5rem',
          }}
        >
          {label}
        </Typography>
      )}
      <StyledTextField
        select
        value={Object.keys(items).includes(value) ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          select: {
            IconComponent: ChevronIcon,
            MenuProps: {
              sx: {
                '& .MuiPaper-root': {
                  borderRadius: '0.75rem',
                  borderColor: theme.color.black[100],
                },
              },
            },
            sx: {
              '& .MuiSelect-icon': {
                top: 'calc(50% - 12px)',
                right: '0.75rem',
              },
            },
          },
        }}
      >
        {Object.entries(items).map(([code, name]) => (
          <MenuItem
            key={code}
            value={code}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {name}
          </MenuItem>
        ))}
      </StyledTextField>
    </StyledFormControl>
  );
};

export default DropDown;
