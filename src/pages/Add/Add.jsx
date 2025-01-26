import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router';
import FullContainer from '../../components/common/FullContainer';
import SwipeDrawer from '../../components/common/SwipeDrawer';
import { ReactComponent as PlaceIcon } from '../../assets/icons/place_24_2_fill_seleceted.svg';
import { ReactComponent as EventIcon } from '../../assets/icons/event_24_2_fill_selected.svg';

const LINK_LIST = [
  {
    icon: <PlaceIcon />,
    text: '장소 추가하기',
    link: '/add/place',
  },
  {
    icon: <EventIcon />,
    text: '이벤트 추가하기',
    link: '/add/event',
  },
];

const Add = () => {
  const theme = useTheme();

  return (
    <FullContainer>
      <div />
      <SwipeDrawer open disableClose>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
            gap: '1.5rem',
          }}
        >
          {LINK_LIST.map(({ icon, text, link }) => (
            <Link
              to={link}
              key={link}
              style={{
                textDecoration: 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    backgroundColor: theme.color.main[3],
                  }}
                >
                  {icon}
                </Box>
                <Typography fontFamily="Pretendard" fontSize="1.125rem" fontWeight="600" color={theme.color.black[900]}>
                  {text}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </SwipeDrawer>
    </FullContainer>
  );
};

export default Add;
