import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled/macro';
import CheckBox from '../common/CheckBox';

const MapListItem = ({ place, onCheckClick, onPlaceClick }) => {
  const theme = useTheme();

  return (
    <Box
      key={place.commonPlaceId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        px: '1.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '1rem',
        }}
      >
        <CheckBox checked={place.visited} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: theme.color.main[100],
            }}
          >
            {place.subCategory}
          </Typography>
          <Typography
            sx={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: theme.color.black[900],
            }}
          >
            {place.placeName}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: theme.color.black[400],
            }}
          >
            {place.addressName}
          </Typography>
        </Box>
      </Box>
      <StyledHr />
    </Box>
  );
};

export default MapListItem;

const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.black[50]};
  margin: 0;
`;
