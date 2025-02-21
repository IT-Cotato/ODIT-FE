import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { EventFilterContainer, EventFilterItem } from '../../styles/Event';
import sort from '../../assets/icons/sort_16.svg';
import { EVENT_CATEGORY_CODE_MAP } from '../../constant';

const EventCategoryFilter = ({ selectedCategory, handleCategoryClick, selectedSort, handleSortChange }) => {
  return (
    <>
      <EventFilterContainer>
        <Button
          onClick={handleSortChange}
          style={{
            background: 'transparent',
            border: selectedSort === 'latest' ? '1px solid #6420FF' : '1px solid #E0E0E0',
            color: selectedSort === 'latest' ? '#6420FF' : 'black',
            padding: '10px 16px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          최신순
          <img
            src={sort}
            alt="Sort Icon"
            style={{
              width: '16px',
              height: '16px',
              filter: selectedSort === 'latest' ? '#6420FF' : 'black',
            }}
          />
        </Button>
        {/* <EventFilterItem
          onClick={() => handleCategoryClick('region')}
          style={{
            background: selectedCategory === 'region' ? '#EFE9FF' : 'transparent',
            border: selectedCategory === 'region' ? '1px solid #6420FF' : '1px solid #E0E0E0',
            color: selectedCategory === 'region' ? '#6420FF' : 'black',
            padding: '10px 16px',
            borderRadius: '20px',
          }}
        >
          <Typography fontSize="14px" fontWeight={selectedCategory === 'region' ? '700' : '400'}>
            지역
          </Typography>
        </EventFilterItem> */}
        {Object.values(EVENT_CATEGORY_CODE_MAP).map((text) => (
          <EventFilterItem
            key={text}
            onClick={() => handleCategoryClick(text)}
            style={{
              background: selectedCategory === text ? '#EFE9FF' : 'transparent',
              border: selectedCategory === text ? '1px solid #6420FF' : '1px solid #E0E0E0',
              color: selectedCategory === text ? '#6420FF' : 'black',
              padding: '10px 16px',
              borderRadius: '20px',
            }}
          >
            <Typography fontSize="14px" fontWeight={selectedCategory === text ? '700' : '400'}>
              {text}
            </Typography>
          </EventFilterItem>
        ))}
      </EventFilterContainer>
      <Box sx={{ width: '100%', borderBottom: '1px solid #E0E0E0', marginTop: '10px' }} />
    </>
  );
};

export default EventCategoryFilter;
