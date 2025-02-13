import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Box, Typography } from '@mui/material';
import 'react-day-picker/style.css';
import FullContainer from '../../components/common/FullContainer';
import SwipeDrawer from '../../components/common/SwipeDrawer';
import { ko } from 'react-day-picker/locale';
import searchIcon from '../../assets/icons/search_24.svg';
import eventIcon from '../../assets/icons/event_24.svg';
import { Topbar, Span, SearchIcon, StyledDayPicker, EventIcon } from '../../styles/Event';

const EVENT_LIST = [
  {
    text: '최신순',
  },
  {
    text: '지역',
  },
  {
    text: '전체',
  },
  {
    text: '전시',
  },
  {
    text: '공연',
  },
  {
    text: '팝업',
  },
  {
    text: '축제',
  },
  {
    text: '기타',
  },
];

const Event = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date());

  return (
    <FullContainer>
      <div className="App">
        <Topbar>
          <SearchIcon src={searchIcon} alt="Search" onClick={() => console.log('Search Icon Clicked!')} />
          <EventIcon src={eventIcon} alt="Event" onClick={() => console.log('Event Icon Clicked!')} />
        </Topbar>

        <StyledDayPicker>
          <DayPicker
            selected={selectedDate}
            onDayClick={setSelectedDate}
            mode="single"
            month={month}
            onMonthChange={setMonth}
            locale={ko}
            hideNavigation
            caption={null}
            captionLayout="dropdown"
            showOutsideDays
            modifiers={{
              selected: selectedDate ? [selectedDate] : [],
            }}
          />
        </StyledDayPicker>

        <SwipeDrawer open disableClose>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '1.5rem',
            }}
          >
            {EVENT_LIST.map(({ text }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  backgroundColor: 'transparent',
                  border: '1px solid black',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                }}
                key={text}
              >
                {/* 닫기 버튼 */}
                <Typography height="17px" fontFamily="Pretendard" fontSize="14px" fontWeight="400">
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </SwipeDrawer>
      </div>
    </FullContainer>
  );
};

export default Event;
