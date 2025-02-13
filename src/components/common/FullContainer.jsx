import React from 'react';
import { Box } from '@mui/material';
import { HEADER_HEIGHT } from '../../constant';

const FullContainer = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: `calc(100% - ${HEADER_HEIGHT})`,
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
};

export default FullContainer;
