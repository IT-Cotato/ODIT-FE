import { Box, Tab, Tabs, useTheme, Button } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { HEADER_HEIGHT } from '../../constant';
import { ReactComponent as AddUserIcon } from '../../assets/icons/user_plus_24_px_line.svg';

const TAB_LIST = [
  { label: '장소', value: 'place' },
  { label: '이벤트', value: 'event' },
];

const HeaderFriend = () => {
  const [tabValue, setTabValue] = React.useState(TAB_LIST[0].value);

  const theme = useTheme();

  const naviagate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get('type') || 'place';

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
    setSearchParams({ type: newValue });
  };

  const handleAddFriendButtonClick = () => {
    naviagate('/friend/add');
  };

  const renderTab = () => {
    return (
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        TabIndicatorProps={{
          sx: {
            backgroundColor: theme.color.black[900],
          },
        }}
      >
        {TAB_LIST.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            label={label}
            sx={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: theme.color.black[300],

              '&.Mui-selected': {
                color: theme.color.black[900],
              },
            }}
          />
        ))}
      </Tabs>
    );
  };

  const renderAddFriendButton = () => {
    return <Button startIcon={<AddUserIcon />} onClick={handleAddFriendButtonClick} sx={{ fontSize: '1.25rem' }} />;
  };

  React.useEffect(() => {
    setTabValue(type);
  }, [type]);

  return (
    <Box
      sx={{
        width: '100%',
        height: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {renderTab()}
      {renderAddFriendButton()}
    </Box>
  );
};

export default HeaderFriend;
