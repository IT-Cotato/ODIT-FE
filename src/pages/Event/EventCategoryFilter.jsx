import React from 'react';
import { Typography } from '@mui/material';
import { EventFilterContainer, EventFilterItem } from '../../styles/Event';
import { ReactComponent as SortIcon } from '../../assets/icons/sort_16.svg';

const EVENT_LIST = ['최신순', '지역', '전체', '전시', '공연', '팝업', '축제', '기타'];

const EventCategoryFilter = ({ selectedCategory, handleCategoryClick }) => {
  return (
    <EventFilterContainer>
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
          {text === '최신순' && (
            <SortIcon
              style={{
                width: '16px',
                height: '16px',
                fill: selectedCategory === '최신순' ? '#6420FF' : 'black', // 보라색으로 바꾸기
              }}
            />
          )}
        </EventFilterItem>
      ))}
    </EventFilterContainer>
  );
};

export default EventCategoryFilter;
