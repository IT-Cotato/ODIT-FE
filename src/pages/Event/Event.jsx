/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import useSWR from 'swr';
import FullContainer from '../../components/common/FullContainer';
import { ko } from 'react-day-picker/locale';
import { ReactComponent as SearchIcon } from '../../assets/icons/search_24.svg';
import { ReactComponent as EventIcon } from '../../assets/icons/event_24.svg';
import { useTheme } from '@emotion/react';
import EventFilter from './EventFilter';
import EventCategoryFilter from './EventCategoryFilter';
import {
  Topbar,
  StyledDayPicker,
  BottomDrawerBox,
  Title,
  StyledEmptyEventIcon,
  Button,
  EmptyEventMessage,
  EventList,
  EventCategory,
  EventName,
  EventDate,
  StyledNavigationBar,
} from '../../styles/Event';
import BottomDrawer from '../../components/common/BottomDrawer';
import useIsBottomDrawerFullOpenStore from '../../stores/useIsBottomDrawerFullOpenStore';
import { Fade, Box, Typography } from '@mui/material';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import useEventsByDate from '../../hooks/useEventsByDate';
import fetcher from '../../utils/fetcher';
import dayjs from 'dayjs';
import { EVENT_CATEGORY_CODE_MAP } from '../../constant';
import CheckBox from '../../components/common/CheckBox';

const Event = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { events, loading, error } = useEventsByDate({ selectedDate });
  const [month, setMonth] = useState(new Date());
  const { selectedCategory, handleCategoryClick } = EventFilter();

  const { data: eventsRes } = useSWR('/api/events', fetcher);

  const { isBottomDrawerFullOpen } = useIsBottomDrawerFullOpenStore();
  const theme = useTheme();

  const handleSearchIconClick = () => {};
  const handleEventIconClick = () => {
    window.location.href = '/EventSelect';
  };

  const handleDayClick = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(12, 0, 0, 0);

    setSelectedDate(adjustedDate);
  };

  const [checkedEvents, setCheckedEvents] = useState({});

  const handleCheckChange = (eventId) => {
    setCheckedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <>
      <FullContainer>
        <div className="App">
          <Topbar>
            <Button onClick={handleSearchIconClick}>
              <SearchIcon />
            </Button>
            <Button onClick={handleEventIconClick}>
              <EventIcon />
            </Button>
          </Topbar>

          <StyledDayPicker>
            <DayPicker
              selected={selectedDate}
              onDayClick={handleDayClick}
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
          <Box sx={{ position: 'relative' }}>
            <BottomDrawer
              sx={{
                position: 'absolute',

                transition: 'bottom 0.3s ease',
                width: '100%',
                zIndex: 5,
              }}
            >
              {isBottomDrawerFullOpen ? (
                <Fade in={isBottomDrawerFullOpen}>
                  <BottomDrawerBox>
                    <Title variant="h1">나의 이벤트</Title>
                    <TextFieldLarge outlined={false} placeholder="기간을 설정할 수 있어요" />
                    <EventCategoryFilter
                      selectedCategory={selectedCategory}
                      handleCategoryClick={handleCategoryClick}
                    />
                    {events.map((event) => (
                      <EventList key={event.id} sx={{ marginBottom: '1rem' }}>
                        <Typography variant="h6">{event.name}</Typography>
                        <Typography>카테고리: {event.category}</Typography>
                      </EventList>
                    ))}
                  </BottomDrawerBox>
                </Fade>
              ) : (
                <Box sx={{ padding: '1rem' }}>
                  <EventCategoryFilter selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
                  {loading && <Typography>로딩 중...</Typography>}
                  {error && <Typography color="error">{error}</Typography>}
                  {events.length === 0 ? (
                    <Box sx={{ textAlign: 'center' }}>
                      <StyledEmptyEventIcon />
                      <EmptyEventMessage>아직 저장한 이벤트가 없어요</EmptyEventMessage>
                    </Box>
                  ) : (
                    (eventsRes?.data || [])
                      .filter(
                        (event) =>
                          dayjs(event.startDate).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD'),
                      )
                      .map((event) => (
                        <EventList key={event.id}>
                          <EventCategory>{EVENT_CATEGORY_CODE_MAP[event.category]}</EventCategory>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CheckBox
                              checked={checkedEvents[event.id] || false}
                              onChange={() => handleCheckChange(event.id)}
                            />
                            <EventName>{event.name}</EventName>
                          </Box>
                          <EventDate>
                            {event.startDate
                              ? `${dayjs(event.startDate).format('YYYY-MM-DD')} - ${dayjs(event.endDate).format('YYYY-MM-DD')}`
                              : '기간 없음'}
                          </EventDate>
                        </EventList>
                      ))
                  )}
                </Box>
              )}
            </BottomDrawer>
          </Box>
        </div>
      </FullContainer>
      <Box sx={{ position: 'fixed', bottom: 0, left: 10, right: 10, zIndex: 10 }}>
        <StyledNavigationBar />
      </Box>
    </>
  );
};

export default Event;
