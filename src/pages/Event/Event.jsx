import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ko } from 'react-day-picker/locale';
import searchIcon from '../../assets/icons/search_24.svg';
import eventIcon from '../../assets/icons/event_24.svg';
import { Topbar, Span, SearchIcon, StyledDayPicker, EventIcon } from '../../styles/Event';

const Event = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date());

  return (
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
            selected: selectedDate ? [selectedDate] : [], // 선택된 날짜 강조
          }}
        />
      </StyledDayPicker>
    </div>
  );
};

export default Event;
