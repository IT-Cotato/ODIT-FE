import React from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import useSWR from 'swr';
import dayjs from 'dayjs';
import NavigationBar from '../../components/common/NavigationBar';
import FullContainer from '../../components/common/FullContainer';
import { EVENT_CATEGORY_CODE_MAP, HEADER_HEIGHT, NAVIGATION_BAR_HEIGHT, PLACE_CATEGORY_CODE_MAP } from '../../constant';
import fetcher from '../../utils/fetcher';
import HeaderSub from '../../components/common/HeaderSub';
import { ReactComponent as Calendar } from '../../assets/icons/calendar_3d.svg';

const Home = () => {
  const { data: eventsToday } = useSWR('/api/events/today', fetcher);
  const { data: placesPopular } = useSWR('/api/places/popular', fetcher);

  const theme = useTheme();

  const renderTodayEvents = () => {
    if (!eventsToday) {
      return null;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          height: '100%',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: theme.color.black[900],
          }}
        >
          오늘 볼 수 있는 이벤트
        </Typography>
        <Stack>
          {eventsToday.data.map((event) => (
            <Box
              key={event.id}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: theme.color.black[400],
                }}
              >
                {EVENT_CATEGORY_CODE_MAP[event.category]}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: theme.color.black[900],
                }}
              >
                {event.name}
              </Typography>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: theme.color.black[400],
                  }}
                >
                  {dayjs(event.startDate).format('YYYY/MM/DD')} {dayjs(event.endDate).format('YYYY/MM/DD')}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  const renderNotDateEvent = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          background: 'rgba(100, 32, 255, 0.05)',
          borderRadius: '1rem',
          border: `1px solid ${theme.color.main[30]}`,
          gap: '2rem',
          my: '2rem',
        }}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
          <Calendar />
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: theme.color.black[900],
              fontWeight: 500,
              width: '9rem',
            }}
          >
            아직 기간을 입력하지 않은 이벤트가 있어요!
          </Typography>
        </Box>
        <Button
          sx={{
            borderRadius: '0.5rem',
            background: theme.color.main[50],
            color: theme.color.black[0],
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          입력하기
        </Button>
      </Box>
    );
  };

  const renderPopularPlaces = () => {
    if (!placesPopular) {
      return null;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1rem',
          height: '100%',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: theme.color.black[900],
          }}
        >
          오늘의 핫플레이스
        </Typography>
        <Stack>
          {placesPopular.data.slice(0, 5).map((place, index) => (
            <Box
              key={place.commonPlaceId}
              sx={{
                width: '100%',
                display: 'flex',
                gap: '1.25rem',
                py: '1rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: theme.color.main[50],
                    fontSize: '1.25rem',
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: theme.color.black[400],
                  }}
                >
                  {PLACE_CATEGORY_CODE_MAP[place.subCategory]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: theme.color.black[900],
                  }}
                >
                  {place.placeName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: theme.color.black[400],
                  }}
                >
                  {place.roadAddressName}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  return (
    <>
      <HeaderSub isShevron={false} isClose={false} isLogo isUser />
      <FullContainer height={`calc(100% - ${NAVIGATION_BAR_HEIGHT} - ${HEADER_HEIGHT})`}>
        {renderTodayEvents()}
        {renderNotDateEvent()}
        {renderPopularPlaces()}
      </FullContainer>
      <NavigationBar />
    </>
  );
};

export default Home;
