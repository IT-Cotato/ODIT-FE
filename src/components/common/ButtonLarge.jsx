import React from 'react';
import { styled, Button } from '@mui/material';
import { useTheme } from '@emotion/react';

const StyledButtonLarge = styled(Button)(({ style }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '21rem',
  height: '3.5rem',
  borderRadius: '0.75rem',
  border: `1px solid ${style.borderColor}`,
  backgroundColor: style.backgroundColor,
  color: style.color,
  fontSize: '1rem',
  fontWeight: 700,
}));

/**
 * ButtonLarge component
 *
 * @param {boolean} disabled - If true, the button is disabled. Default is false.
 * @param {React.ReactNode} children - The content of the button.
 * @param {string} color - The color style of the button. Default is an empty string.
 * @param {function} onClick - Function to call when the button is clicked. Default is an empty function.
 */
const ButtonLarge = ({ disabled = false, children, color = '', onClick = () => {} }) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    switch (color) {
      case 'enabled':
        return {
          backgroundColor: theme.color.main[100],
          color: theme.color.black[0],
          borderColor: theme.color.main[100],
        };
      case 'disabled':
        return {
          backgroundColor: theme.color.black[100],
          color: theme.color.black[400],
          borderColor: theme.color.black[100],
        };
      default:
        return {
          backgroundColor: theme.color.black[0],
          color: theme.color.black[600],
          borderColor: theme.color.black[100],
        };
    }
  };

  return (
    <StyledButtonLarge disabled={disabled} style={getButtonStyle()} onClick={onClick}>
      {children}
    </StyledButtonLarge>
  );
};

export default ButtonLarge;
