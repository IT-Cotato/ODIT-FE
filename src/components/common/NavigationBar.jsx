import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { ReactComponent as HomeDefaultIcon } from '../../assets/icons/home_24_2_fill_default.svg';
import { ReactComponent as HomeSelectedIcon } from '../../assets/icons/home_24_2_px_fill_selected.svg';
import { ReactComponent as PlaceDefaultIcon } from '../../assets/icons/place_24_2_fill_default.svg';
import { ReactComponent as PlaceSelectedIcon } from '../../assets/icons/place_24_2_px_fill_selected.svg';
import { ReactComponent as EventDefaultIcon } from '../../assets/icons/event_24_2_px_fill_default.svg';
import { ReactComponent as EventSelectedIcon } from '../../assets/icons/event_24_2_px_fill_selected.svg';
import { ReactComponent as FriendDefaultIcon } from '../../assets/icons/friend_24_2_px_fill_default.svg';
import { ReactComponent as FriendSelectedIcon } from '../../assets/icons/friend_24_2_px_fill_selected.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/link.svg';
import { NAVIGATION_BAR_HEIGHT } from '../../constant';

const NAVIGATION_BAR_ITEMS = [
  {
    defaultIcon: <HomeDefaultIcon />,
    selectedIcon: <HomeSelectedIcon />,
    path: '/',
  },
  {
    defaultIcon: <PlaceDefaultIcon />,
    selectedIcon: <PlaceSelectedIcon />,
    path: '/map',
  },
  {
    defaultIcon: <LinkIcon />,
    selectedIcon: <LinkIcon />,
    path: '/add',
  },
  {
    defaultIcon: <EventDefaultIcon />,
    selectedIcon: <EventSelectedIcon />,
    path: '/event',
  },
  {
    defaultIcon: <FriendDefaultIcon />,
    selectedIcon: <FriendSelectedIcon />,
    path: '/friend',
  },
];

const NavigationBar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <BottomNavigation
      showLabels={false}
      value={0}
      onChange={(_, newValue) => {
        handleNavigation(NAVIGATION_BAR_ITEMS[newValue].path);
      }}
      sx={{
        width: '100%',
        height: NAVIGATION_BAR_HEIGHT,
        justifyContent: 'space-between',
      }}
    >
      {NAVIGATION_BAR_ITEMS.map(({ label, defaultIcon, selectedIcon, path }) => (
        <BottomNavigationAction
          key={label}
          icon={location.pathname.includes(path) ? selectedIcon : defaultIcon}
          sx={{
            minWidth: 0,
          }}
        />
      ))}
    </BottomNavigation>
  );
};

export default NavigationBar;
