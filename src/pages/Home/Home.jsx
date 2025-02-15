import React from 'react';
import { Box } from '@mui/material';
import useSWR from 'swr';
import dayjs from 'dayjs';
import NavigationBar from '../../components/common/NavigationBar';
import FullContainer from '../../components/common/FullContainer';
import { NAVIGATION_BAR_HEIGHT } from '../../constant';
import fetcher from '../../utils/fetcher';

const Home = () => {
  const { data: placesRes } = useSWR('/api/places', fetcher);
  const { data: eventsRes } = useSWR('/api/events', fetcher);

  return (
    <>
      <FullContainer height={`calc(100% - ${NAVIGATION_BAR_HEIGHT})`}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            border: '2px solid purple',
          }}
        >
          <div>저장한 장소</div>
          {placesRes?.data.map((place) => (
            <Box
              key={place.commonPlaceId}
              sx={{
                border: '1px solid black',
              }}
            >
              {place.placeName}
              <br />
              {place.roadAddressName}
              <br />
              {place.visited ? '방문' : '미방문'}
              <br />
              {place.memo}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1rem',
            border: '2px solid purple',
          }}
        >
          <div>저장한 이벤트</div>
          {eventsRes?.data.map((event) => (
            <Box
              key={event.id}
              sx={{
                border: '1px solid black',
              }}
            >
              {event.name}
              <br />
              {event.startDate
                ? `${dayjs(event.startDate).format('YYYY-MM-DD')} ~ ${dayjs(event.endDate).format('YYYY-MM-DD')}`
                : '기간 없음'}
              <br />
              {event.visited ? '방문' : '미방문'}
              <br />
              {event.memo}
            </Box>
          ))}
        </Box>
      </FullContainer>
      <NavigationBar />
    </>
  );
};

export default Home;
