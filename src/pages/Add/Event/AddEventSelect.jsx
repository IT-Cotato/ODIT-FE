import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import FullContainer from '../../../components/common/FullContainer';
import AddSearchList from '../../../components/Add/AddSearchList';
import ButtonLarge from '../../../components/common/ButtonLarge';

const AddEventSelect = () => {
  const [searchedEvents, setSearchedEvents] = React.useState([]);
  const [checkedEvents, setCheckedEvents] = React.useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const handleCheckEvent = (index) => {
    if (checkedEvents.includes(searchedEvents[index])) {
      setCheckedEvents(checkedEvents.filter((checkedEvent) => checkedEvent !== searchedEvents[index]));
    } else {
      setCheckedEvents([...checkedEvents, searchedEvents[index]]);
    }
  };

  const handleNextButton = () => {
    navigate('/add/event/0', {
      state: {
        events: checkedEvents,
      },
    });
  };

  React.useEffect(() => {
    setSearchedEvents(location.state.contentResponseList);
  }, [location.state]);

  return (
    <FullContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '2.5rem',
          height: 'inherit',
          width: '100%',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '140%',
          }}
        >
          저장하고 싶은
          <br />
          이벤트를 선택해 주세요
        </Typography>
        <AddSearchList searchResults={searchedEvents} checkedResults={checkedEvents} onClick={handleCheckEvent} />
      </Box>
      <ButtonLarge disabled={checkedEvents.length === 0} color="enabled" onClick={handleNextButton}>
        다음으로
      </ButtonLarge>
    </FullContainer>
  );
};

export default AddEventSelect;
