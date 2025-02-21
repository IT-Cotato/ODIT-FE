import React, { useState } from 'react';
import useSWR from 'swr';
import { Box, Typography } from '@mui/material';
import HeaderSub from '../../components/common/HeaderSub';
import EventFilter from './EventFilter';
import { EVENT_CATEGORY_CODE_MAP } from '../../constant';
import CheckBox from '../../components/common/CheckBox';
import fetcher from '../../utils/fetcher';
import { EventList, EventCategory, EventFilterItem, EventFilterContainer, EventName } from '../../styles/Event';

const EVENT_SELECT_LIST = ['전체', '전시', '공연'];

const EventSelect = () => {
  const { data: eventsRes, error } = useSWR('/api/events', fetcher);
  const [checkedEvents, setCheckedEvents] = useState({});

  const handleCheckChange = (eventId) => {
    setCheckedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const { selectedCategory, handleCategoryClick } = EventFilter();
  const filteredEvents = (eventsRes?.data || []).filter((event) => !event.startDate);

  return (
    <>
      <div>
        <HeaderSub isClose={false} text="기간 등록하기" />
      </div>
      <Box sx={{ padding: '1rem' }}>
        <EventFilterContainer>
          {EVENT_SELECT_LIST.map((text) => (
            <EventFilterItem
              selectedCategory={selectedCategory}
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
        {error && <Typography color="error">데이터를 불러오는 데 실패했습니다.</Typography>}
        {!eventsRes ? (
          <Typography>로딩 중...</Typography>
        ) : filteredEvents.length === 0 ? (
          <Typography>기간이 없는 이벤트가 없습니다.</Typography>
        ) : (
          filteredEvents.map((event, index) => (
            <div key={event.id}>
              <EventList sx={{ padding: '16px 0' }}>
                <EventCategory>{EVENT_CATEGORY_CODE_MAP[event.category]}</EventCategory>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckBox checked={checkedEvents[event.id] || false} onChange={() => handleCheckChange(event.id)} />
                  <EventName>{event.name}</EventName>
                </Box>
              </EventList>
              {index !== filteredEvents.length - 1 && <hr style={{ border: '0.5px solid #E0E0E0', width: '100%' }} />}
            </div>
          ))
        )}
      </Box>
    </>
  );
};

export default EventSelect;
