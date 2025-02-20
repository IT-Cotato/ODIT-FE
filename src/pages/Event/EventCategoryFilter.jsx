import React from 'react';
import { Typography } from '@mui/material';
import { EventFilterContainer, EventFilterItem } from '../../styles/Event';
import sort from '../../assets/icons/sort_16.svg';

const EVENT_LIST = ['전시', '공연', '팝업', '축제', '기타'];

const EventCategoryFilter = ({ selectedCategory, handleCategoryClick }) => {
  return (
    <EventFilterContainer>
      <EventFilterItem
        onClick={() => handleCategoryClick('latest')}
        style={{
          background: 'transparent',
          border: selectedCategory === 'latest' ? '1px solid #6420FF' : '1px solid #E0E0E0',
          color: selectedCategory === 'latest' ? '#6420FF' : 'black',
          padding: '10px 16px',
          borderRadius: '20px',
        }}
      >
        <Typography fontSize="14px" fontWeight={selectedCategory === '500'}>
          최신순
        </Typography>
        <img
          src={sort}
          alt="Sort Icon"
          style={{
            width: '16px',
            height: '16px',
            filter: selectedCategory === '최신순' ? '#6420FF' : 'black',
          }}
        />
      </EventFilterItem>
      <EventFilterItem
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
      </EventFilterItem>
      {EVENT_LIST.map((text) => (
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
  );
};

export default EventCategoryFilter;
