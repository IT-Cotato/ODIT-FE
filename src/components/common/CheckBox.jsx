import React from 'react';
import { Checkbox } from '@mui/material';
import { useTheme } from '@emotion/react';

/**
 * CheckBox component
 * @param {boolean} checked - checked state
 * @param {function} onChange - change event for the checkbox
 * @returns
 */
const CheckBox = ({ checked, onChange }) => {
  const theme = useTheme();

  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      sx={{
        color: theme.color.black[200],
        padding: 0,

        '& .MuiSvgIcon-root': {
          width: '2rem',
          height: '2rem',
        },

        '&.Mui-checked': {
          color: theme.color.main[100],
        },
      }}
    />
  );
};

export default CheckBox;
