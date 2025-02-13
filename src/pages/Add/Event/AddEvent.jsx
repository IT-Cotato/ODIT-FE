/* eslint-disable no-param-reassign */
import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router';
import { produce } from 'immer';
import FullContainer from '../../../components/common/FullContainer';
import TextFieldLarge from '../../../components/common/TextFieldLarge';
import ButtonLarge from '../../../components/common/ButtonLarge';
import EventDatePicker from '../../../components/common/DatePicker/EventDatePicker';
import { ReactComponent as CircleCheckIcon } from '../../../assets/icons/circle_check_24_1_5_line.svg';
import { ReactComponent as CircleCheckFilledIcon } from '../../../assets/icons/circle_check_24_2_line.svg';
import DropDown from '../../../components/common/DropDown';
import { EVENT_CATEGORY_CODE_MAP } from '../../../constant';
import { postEvents } from '../../../apis/events';
import { useSnackbar } from '../../../hooks/useSnackbark';

const AddEvent = () => {
  const [eventList, setEventList] = React.useState([]);
  const [isPeriod, setIsPeriod] = React.useState(true);

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const theme = useTheme();

  const location = useLocation();

  const navigate = useNavigate();

  const { index } = useParams();
  const numericIndex = Number(index);

  const { name, startDate, endDate, location: address, category, memo } = eventList.at(numericIndex) ?? {};

  const handleNameChange = (newName) => {
    setEventList(
      produce(eventList, (draft) => {
        draft[numericIndex].name = newName;
      }),
    );
  };

  const handleCategoryChange = (newCategory) => {
    setEventList(
      produce(eventList, (draft) => {
        draft[numericIndex].category = newCategory;
      }),
    );
  };

  const handleStartDateChange = (newDate) => {
    setEventList(
      produce(eventList, (draft) => {
        draft[numericIndex].startDate = newDate;

        if (draft[numericIndex].endDate < newDate) {
          draft[numericIndex].endDate = newDate;
        }
      }),
    );
  };

  const handleEndDateChange = (newDate) => {
    setEventList(
      produce(eventList, (draft) => {
        draft[numericIndex].endDate = newDate;

        if (draft[numericIndex].startDate > newDate) {
          draft[numericIndex].startDate = newDate;
        }
      }),
    );
  };

  const handleIsPeriodChange = () => {
    if (isPeriod) {
      setEventList(
        produce(eventList, (draft) => {
          draft[numericIndex].startDate = null;
          draft[numericIndex].endDate = null;
        }),
      );
    }

    setIsPeriod(!isPeriod);
  };

  const handleAddressChange = (newAddress) => {
    setEventList(
      produce(eventList, (draft) => {
        draft[numericIndex].location = newAddress;
      }),
    );
  };

  const handleMemoChange = (newMemo) => {
    setEventList(
      produce(eventList, (draft) => {
        draft[numericIndex].memo = newMemo;
      }),
    );
  };

  const handleNextButton = () => {
    postEvents(eventList[numericIndex])
      .then(() => {
        navigate(`/add/place/${numericIndex + 1}`);
      })
      .catch(() => {
        showSnackbar('error', '이벤트를 저장하는데 실패했습니다.');
      });
  };

  const handleSubmitButton = () => {
    postEvents(eventList[numericIndex])
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        showSnackbar('error', '이벤트를 저장하는데 실패했습니다.');
      });
  };

  React.useEffect(() => {
    if (location.state?.events) {
      const newEvents = location.state.events.map((event) => {
        const startPeriod = event?.period.split('to')[0];
        const endPeriod = event?.period.split('to')[1];

        return {
          name: event.name,
          category: event.type,
          location: event.location,
          startDate: startPeriod ? new Date(startPeriod) : null,
          endDate: endPeriod ? new Date(endPeriod) : null,
          memo: '',
        };
      });
      setEventList(newEvents);
    } else {
      setEventList([
        {
          name: '',
          startDate: null,
          endDate: null,
          location: '',
          category: '',
          memo: '',
        },
      ]);
    }
  }, [location.state]);

  return (
    <>
      <FullContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            marginBottom: '2.5rem',
          }}
        >
          <TextFieldLarge
            label="이벤트명"
            placeholder="이벤트명을 입력해 주세요."
            value={name}
            onChange={handleNameChange}
          />
          <DropDown label="카테고리" value={category} items={EVENT_CATEGORY_CODE_MAP} onChange={handleCategoryChange} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                px: '0.5rem',
              }}
            >
              기간
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                width: '21rem',
              }}
            >
              <EventDatePicker disabled={!isPeriod} date={startDate} label="시작일" onChange={handleStartDateChange} />
              <EventDatePicker disabled={!isPeriod} date={endDate} label="종료일" onChange={handleEndDateChange} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={handleIsPeriodChange}
                sx={{
                  minWidth: '3rem',
                }}
              >
                {isPeriod ? <CircleCheckIcon /> : <CircleCheckFilledIcon />}
              </Button>
              <Typography
                sx={{
                  color: isPeriod ? theme.color.black[400] : theme.color.black[900],
                }}
              >
                기간 정보를 알 수 없어요
              </Typography>
            </Box>
          </Box>
          <TextFieldLarge
            label="위치(선택)"
            placeholder="위치를 입력해 주세요."
            value={address}
            onChange={handleAddressChange}
          />
          <TextFieldLarge
            label="메모(선택)"
            value={memo}
            placeholder="메모를 입력해 주세요"
            onChange={handleMemoChange}
          />
        </Box>
        {numericIndex < eventList.length - 1 ? (
          <ButtonLarge color="enabled" onClick={handleNextButton}>
            다음 장소 확인하기
          </ButtonLarge>
        ) : (
          <ButtonLarge color="enabled" onClick={handleSubmitButton}>
            저장하기
          </ButtonLarge>
        )}
      </FullContainer>
      <SnackbarComponent />
    </>
  );
};

export default AddEvent;
