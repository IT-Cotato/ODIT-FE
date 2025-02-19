import React from 'react';
import { Box } from '@mui/material';

const REGIONS = ['서울', '부산', '대구', '광주', '대전'];

const EventRegionFilter = ({ showRegionFilter, selectedRegion, setSelectedRegion, setShowRegionFilter }) => {
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setShowRegionFilter(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        onClick={() => setShowRegionFilter((prev) => !prev)}
        sx={{
          padding: '10px 16px',
          backgroundColor: '#EFE9FF',
          borderRadius: '20px',
          border: '1px solid #6420FF',
          color: '#6420FF',
          cursor: 'pointer',
          textAlign: 'center',
        }}
      >
        지역
      </Box>

      {showRegionFilter && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            width: '100%',
            padding: '10px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '8px',
          }}
        >
          {REGIONS.map((region) => (
            <Box
              key={region}
              onClick={() => handleRegionClick(region)}
              sx={{
                padding: '6px 12px',
                borderRadius: '20px',
                background: selectedRegion === region ? '#EFE9FF' : 'white',
                border: selectedRegion === region ? '1px solid #6420FF' : '1px solid #E0E0E0',
                color: selectedRegion === region ? '#6420FF' : 'black',
                cursor: 'pointer',
                '&:hover': {
                  background: '#f0f0f0',
                },
              }}
            >
              {region}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EventRegionFilter;
