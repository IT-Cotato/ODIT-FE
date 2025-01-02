import React from 'react';
import { Box } from '@mui/material';

const GlobalFallback = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      로딩중
    </Box>
  );
};

export default GlobalFallback;
