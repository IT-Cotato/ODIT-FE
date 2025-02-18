import React from 'react';
import { Box } from '@mui/material';

const REGIONS = ['서울', '부산', '대구', '광주', '대전'];

const EventRegionFilter = ({ showRegionFilter, selectedRegion, setSelectedRegion, setShowRegionFilter }) => {
  // 지역을 클릭하면 선택된 지역으로 설정하고 드롭다운을 닫음
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setShowRegionFilter(false); // 지역 선택 후 드롭다운 닫기
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* 기존의 "지역" 버튼 클릭 시 드롭다운 토글 */}
      <Box
        onClick={() => setShowRegionFilter((prev) => !prev)} // 지역 버튼 클릭 시 드롭다운 토글
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

      {/* 드롭다운 메뉴 */}
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
              onClick={() => handleRegionClick(region)} // 지역 클릭 시 선택
              sx={{
                padding: '6px 12px',
                borderRadius: '20px',
                background: selectedRegion === region ? '#EFE9FF' : 'white',
                border: selectedRegion === region ? '1px solid #6420FF' : '1px solid #E0E0E0',
                color: selectedRegion === region ? '#6420FF' : 'black',
                cursor: 'pointer',
                '&:hover': {
                  background: '#f0f0f0', // 호버 효과
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
