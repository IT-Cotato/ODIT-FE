import React from 'react';
import { Box, useTheme } from '@mui/material';
import { PLACE_CATEGORY_CODE_WITH_ALL_MAP } from '../../constant';
import FilterChip from '../../components/common/FilterChip';

const MapListCategoryFilter = ({ checkedCategories, onChange }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
        padding: '0.75rem',
        overflowX: 'scroll',
        borderBottom: `1px solid ${theme.color.black[50]}`,
        scrollbarWidth: 'none',
      }}
    >
      {Object.entries(PLACE_CATEGORY_CODE_WITH_ALL_MAP).map(([code, name]) => (
        <FilterChip key={code} checked={checkedCategories.includes(code)} label={name} onClick={() => onChange(code)} />
      ))}
    </Box>
  );
};

export default MapListCategoryFilter;
