import React from 'react';
import { styled, TextField, InputAdornment, useTheme, Button, FormControl, Typography } from '@mui/material';
import { ReactComponent as SearchIcon } from '../../assets/icons/search_24.svg';
import { ReactComponent as ClearIcon } from '../../assets/icons/x_24_1_5.svg';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '21rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  background: theme.color.black[0],
  borderRadius: '0.75rem',
}));

const StyledTextField = styled(TextField)(({ theme, outlineColor, borderRadius = '0.75rem' }) => ({
  height: '3.5rem',

  '& .Mui-disabled': {
    '-webkit-text-fill-color': theme.color.black[400],
    background: theme.color.black[30],
    borderRadius: `${borderRadius}`,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: `${borderRadius}`,
    borderColor: `${outlineColor === theme.color.black[900] ? theme.color.black[100] : outlineColor} !important`,
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
 * @param {boolean} disabled - If true, the text field is disabled. Default is false.
 * @param {boolean} outlined - Determines if the text field should have an outline. Default is true.
 * @param {boolean} hasSearchAdornment - Determines if the text field should have a search icon adornment. Default is false.
 * @param {boolean} hasClearAdornment - Determines if the text field should have a clear icon adornment. Default is false.
 * @param {string} placeholder - Placeholder text for the text field. Default is an empty string.
 * @param {string} value - Value of the text field. Default is an empty string.
 * @param {string} label - Label for the text field.
 * @param {string} outlineColor - Color of the outline.
 * @param {function} onChange - Function to call when the value changes. Default is an empty function.
 */
const TextFieldLarge = ({
  disabled = false,
  outlined = true,
  hasSearchAdornment = false,
  hasClearAdornment = false,
  placeholder = '',
  value = '',
  label,
  outlineColor,
  onChange = () => {},
}) => {
  const theme = useTheme();

  const getOutlineColor = () => {
    if (disabled) {
      return 'transparent';
    }

    if (outlineColor === 'success') {
      return theme.color.main[100];
    }

    if (outlineColor === 'error') {
      return theme.color.error;
    }

    return theme.color.black[900];
  };

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
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant={outlined ? 'outlined' : 'standard'}
        outlineColor={getOutlineColor()}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
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
    </StyledFormControl>
  );
};

export default TextFieldLarge;
