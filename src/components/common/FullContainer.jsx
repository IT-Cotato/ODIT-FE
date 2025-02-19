import React from 'react';
import { Box } from '@mui/material';
import { HEADER_HEIGHT } from '../../constant';

/**
 * FullContainer component
 * Style for full flex colomn container
 * @param {string} height - height of container (default: `calc(100% - ${HEADER_HEIGHT})`)
 */
const FullContainer = ({ height = `calc(100% - ${HEADER_HEIGHT})`, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height,
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
};

export default FullContainer;
