import React from 'react';
import { Checkbox } from '@mui/material';
import { useTheme } from '@emotion/react';
import { ReactComponent as SquareIcon } from '../../assets/icons/square_check_24_1_5_line_default.svg';
import { ReactComponent as SquareCheckIcon } from '../../assets/icons/square_check_24_1_5_fill.svg';

/**
 * CheckBox component
 * @param {boolean} checked - checked state
 * @param {function} onChange - change event for the checkbox
 * @returns
 */
const CheckBox = ({ checked, onChange, icon = <SquareIcon />, checkedIcon = <SquareCheckIcon /> }) => {
  const theme = useTheme();

  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      checkedIcon={checkedIcon}
      icon={icon}
      sx={{
        color: theme.color.black[200],
        padding: 0,

        '& .MuiSvgIcon-root': {
          width: '1.5rem',
          height: '1.5rem',
        },
      }}
    />
  );
};

export default CheckBox;
