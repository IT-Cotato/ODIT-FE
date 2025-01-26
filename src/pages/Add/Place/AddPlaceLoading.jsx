import React from 'react';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';
import styled from '@emotion/styled';
import { SyncLoader } from 'react-spinners';
import { useTheme } from '@emotion/react';
import { ReactComponent as Coffee } from '../../../assets/icons/coffee.svg';
import { ReactComponent as Pizza } from '../../../assets/icons/pizza.svg';
import { ReactComponent as Cake } from '../../../assets/icons/cake.svg';
import { ReactComponent as Festival } from '../../../assets/icons/festival.svg';
import { ReactComponent as Culture } from '../../../assets/icons/culture.svg';
import { ReactComponent as Exhibition } from '../../../assets/icons/exhibition.svg';
import { ReactComponent as Noodle } from '../../../assets/icons/noodle.svg';
import { ReactComponent as Home } from '../../../assets/icons/home.svg';
import { ReactComponent as Store } from '../../../assets/icons/store.svg';
import { ReactComponent as Theater } from '../../../assets/icons/theater.svg';
import { ReactComponent as Rice } from '../../../assets/icons/rice.svg';

const MARQUEE_LIST_TOP = [
  { key: 'coffee-0', component: <Coffee /> },
  { key: 'pizza-1', component: <Pizza /> },
  { key: 'cake-2', component: <Cake /> },
  { key: 'festival-3', component: <Festival /> },
  { key: 'culture-4', component: <Culture /> },
];

const MARQUEE_LIST_BOTTOM = [
  { key: 'exhibition-5', component: <Exhibition /> },
  { key: 'noodle-6', component: <Noodle /> },
  { key: 'home-7', component: <Home /> },
  { key: 'store-8', component: <Store /> },
  { key: 'theater-9', component: <Theater /> },
  { key: 'rice-10', component: <Rice /> },
];

const MARQUEE_SPEED = 100;

const AddPlaceLoading = () => {
  const theme = useTheme();

  const renderMarquee = () => {
    return (
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Marquee speed={MARQUEE_SPEED}>
          {MARQUEE_LIST_TOP.map(({ component, key }) => (
            <IconBackground key={key}>{component}</IconBackground>
          ))}
        </Marquee>
        <Marquee speed={MARQUEE_SPEED} direction="right">
          {MARQUEE_LIST_BOTTOM.map(({ component, key }) => (
            <IconBackground key={key}>{component}</IconBackground>
          ))}
        </Marquee>
      </Box>
    );
  };

  const renderDescription = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <SyncLoader
          size="1rem"
          margin="0.75rem"
          color={theme.color.main[100]}
          style={{
            margin: '0.75rem',
          }}
        />
        <Typography
          variant="h1"
          sx={{
            color: theme.color.black[900],
            fontSize: '1.5rem',
            fontWeight: 700,
          }}
        >
          정보를 추출하고 있어요
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: theme.color.black[400],
            fontSize: '1rem',
          }}
        >
          추출 과정은 10초 정도 소요될 수 있어요
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '6rem',
      }}
    >
      {renderMarquee()}
      {renderDescription()}
    </Box>
  );
};

export default AddPlaceLoading;

const IconBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.main[3]};
  margin: 0.75rem;
`;
