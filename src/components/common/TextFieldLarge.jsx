import React from 'react';
import { styled, TextField, InputAdornment, useTheme, Button } from '@mui/material';
import { ReactComponent as SearchIcon } from '../../assets/icons/search_24.svg';
import { ReactComponent as ClearIcon } from '../../assets/icons/x_24_1_5.svg';

const StyledTextField = styled(TextField)(({ theme, outlineColor }) => ({
  width: '21rem',
  height: '3.5rem',

  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0.75rem',
    borderColor: `${outlineColor === theme.color.black[900] ? theme.color.black[100] : outlineColor}`,
  },

  '&:hover fieldset': {
    borderColor: `${outlineColor} !important`,
  },

  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: `${outlineColor}`,
      borderWidth: '1px',
    },
  },

  '& .MuiInputBase-input': {
    fontSize: '1rem',
  },

  '& .MuiInputAdornment-positionStart': {
    marginRight: '0.75rem',
  },

  '& . MuiInputAdornment-positionEnd': {
    marginLeft: '0',
  },
}));

/**
 * TextFieldLarge component
 *
 * @param {boolean} outlined - Determines if the text field should have an outline. Default is true.
 * @param {boolean} hasSearchAdornment - Determines if the text field should have a search icon adornment. Default is false.
 * @param {boolean} hasClearAdornment - Determines if the text field should have a clear icon adornment. Default is false.
 * @param {string} placeholder - Placeholder text for the text field. Default is an empty string.
 * @param {string} value - Value of the text field. Default is an empty string.
 * @param {string} outlineColor - Color of the outline.
 * @param {function} onChange - Function to call when the value changes. Default is an empty function.
 */
const TextFieldLarge = ({
  outlined = true,
  hasSearchAdornment = false,
  hasClearAdornment = false,
  placeholder = '',
  value = '',
  outlineColor,
  onChange = () => {},
}) => {
  const theme = useTheme();

  const getOutlineColor = () => {
    switch (outlineColor) {
      case 'success':
        return theme.color.main[100];
      case 'error':
        return theme.color.error;
      default:
        return theme.color.black[900];
    }
  };

  return (
    <StyledTextField
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant={outlined ? 'outlined' : 'standard'}
      outlineColor={getOutlineColor()}
      slotProps={{
        input: {
          startAdornment: hasSearchAdornment ? (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ) : null,
          endAdornment: hasClearAdornment ? (
            <InputAdornment position="end">
              <Button
                onClick={() => onChange('')}
                sx={{
                  minWidth: '0',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ClearIcon />
              </Button>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
};

export default TextFieldLarge;
