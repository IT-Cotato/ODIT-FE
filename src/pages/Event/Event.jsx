/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import FullContainer from '../../components/common/FullContainer';
import { ko } from 'react-day-picker/locale';
import { ReactComponent as SearchIcon } from '../../assets/icons/search_24.svg';
import { ReactComponent as EventIcon } from '../../assets/icons/event_24.svg';
import { ReactComponent as EmptyEventIcon } from '../../assets/icons/empty_event.svg';
import { useTheme } from '@emotion/react';
import EventFilter from './EventFilter';
import EventCategoryFilter from './EventCategoryFilter';
import { Topbar, StyledDayPicker } from '../../styles/Event';
import BottomDrawer from '../../components/common/BottomDrawer';
import useIsBottomDrawerFullOpenStore from '../../stores/useIsBottomDrawerFullOpenStore';
import { Fade, Box, Typography } from '@mui/material';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import useEventsByDate from '../../hooks/useEventsByDate';
import styled from '@emotion/styled';

const Event = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const { events, loading, error } = useEventsByDate({ selectedDate });
  const [month, setMonth] = useState(new Date());
  const { selectedCategory, showRegionFilter, selectedRegion, handleCategoryClick, setSelectedRegion } = EventFilter();

  const { isBottomDrawerFullOpen } = useIsBottomDrawerFullOpenStore();
  const theme = useTheme();

  const handleSearchIconClick = () => {};
  const handleEventIconClick = () => {
    window.location.href = '/EventSelect';
  };

  return (
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
          {isBottomDrawerFullOpen ? (
            <Fade in={isBottomDrawerFullOpen}>
              <BottomDrawerBox>
                <Title variant="h1">나의 이벤트</Title>
                <TextFieldLarge outlined={false} placeholder="기간을 설정할 수 있어요" />
                {events.length === 0 ? (
                  <EventCategoryFilter selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
                ) : (
                  events.map((event) => (
                    <Box key={event.id} sx={{ marginBottom: '1rem' }}>
                      <Typography variant="h6">{event.name}</Typography>
                      <Typography>{event.category}</Typography>
                      <Typography>{event.memo}</Typography>
                    </Box>
                  ))
                )}
              </BottomDrawerBox>
            </Fade>
          ) : (
            <Box sx={{ padding: '1rem' }}>
              <EventCategoryFilter selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
              {loading && <Typography>로딩 중...</Typography>}
              {error && <Typography color="error">{error}</Typography>}
              {!loading && events.length === 0 && !error && (
                <Box sx={{ textAlign: 'center' }}>
                  <StyledEmptyEventIcon />
                  <EmptyEventMessage>아직 저장한 이벤트가 없어요</EmptyEventMessage>
                </Box>
              )}
            </Box>
          )}
        </BottomDrawer>
      </div>
    </FullContainer>
  );
};

export default Event;

const Button = styled.button`
  background: none;
  border: none;
  left: 283px;
  width: 50px;
  height: 50px;
  top: 8px;
  cursor: pointer;
  position: relative;
  display: inline-block;
`;

const BottomDrawerBox = styled(Box)`
  width: 100%;
  height: 778px;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: -1rem;
  align-items: center;
  margin-left: 20px;
`;

const Title = styled(Typography)`
  color: ${(props) => props.theme.color.black[900]};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 140%;
`;

const StyledEmptyEventIcon = styled(EmptyEventIcon)`
  width: 72px;
  height: 90px;
  margin-top: 1.5rem;
`;

const EmptyEventMessage = styled(Typography)`
  color: ${(props) => props.theme.color.main[50]};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.2px;
  letter-spacing: 0%;
  text-align: center;
  margin-top: 1.5rem;
`;
