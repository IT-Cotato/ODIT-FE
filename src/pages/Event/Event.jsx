/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import FullContainer from '../../components/common/FullContainer';
import { ko } from 'react-day-picker/locale';
import { ReactComponent as SearchIcon } from '../../assets/icons/search_24.svg';
import { ReactComponent as EventIcon } from '../../assets/icons/event_24.svg';
import { useTheme } from '@emotion/react';
import EventFilter from './EventFilter';
import EventCategoryFilter from './EventCategoryFilter';
import EventRegionFilter from './EventRegionFilter';
import { Topbar, StyledDayPicker } from '../../styles/Event';
import BottomDrawer from '../../components/common/BottomDrawer';
import useIsBottomDrawerFullOpenStore from '../../stores/useIsBottomDrawerFullOpenStore';
import { Fade, Box, Typography } from '@mui/material';
import TextFieldLarge from '../../components/common/TextFieldLarge';

const Event = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date());
  const { selectedCategory, showRegionFilter, selectedRegion, handleCategoryClick, setSelectedRegion } = EventFilter();

  const { isBottomDrawerFullOpen } = useIsBottomDrawerFullOpenStore();

  const theme = useTheme();

  const handleSearchIconClick = () => {};

  const handleEventIconClick = () => {
    console.log('Event Icon Clicked!');
    window.location.href = '/EventSelect';
  };

  // onClick={() => (window.location.href = '/event')}

  return (
    <FullContainer>
      <div className="App">
        <Topbar>
          <button
            type="button"
            onClick={handleSearchIconClick}
            style={{
              background: 'none',
              border: 'none',
              left: '283px',
              width: '50px',
              height: '50px',
              top: '8px',
              cursor: 'pointer',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={handleEventIconClick}
            style={{
              background: 'none',
              border: 'none',
              left: '285px',
              width: '50px',
              height: '50px',
              top: '8px',
              cursor: 'pointer',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <EventIcon />
          </button>
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
        <BottomDrawer>
          {isBottomDrawerFullOpen && (
            <Fade in={isBottomDrawerFullOpen}>
              <Box
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: '1.5rem',
                  marginBottom: '-1rem',
                  alignItems: 'center',
                  marginLeft: '20px',
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: theme.color.black[900],
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    lineHeight: '140%',
                  }}
                >
                  나의 이벤트
                </Typography>
                <TextFieldLarge outlined={false} placeholder="기간을 설정할 수 있어요" />
              </Box>
            </Fade>
          )}

          <EventCategoryFilter selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />

          {/* {filteredEvents.map(event => <EventItem key={event.id} event={event} />)} */}
        </BottomDrawer>
      </div>
    </FullContainer>
  );
};

export default Event;
