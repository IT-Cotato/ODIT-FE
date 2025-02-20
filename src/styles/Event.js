import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import NavigationBar from '../components/common/NavigationBar';
import { ReactComponent as EmptyEventIcon } from '../assets/icons/empty_event.svg';

export const Topbar = styled.div`
  width: 375px;
  height: 56px;
  top: 44px;
  gap: 203px;
  opacity: 1;
  position: relative;
`;

export const Span = styled.span`
  width: 130px;
  height: 24px;
  top: 16px;
  left: 20px;
  gap: 4px;
  opacity: 1;
  position: absolute;
`;

export const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 18px;
  left: 283px;
  opacity: 1;
`;

export const EventIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 18px;
  left: 323px;
  opacity: 1;
`;

export const StyledDayPicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .rdp-dropdown {
    gap: 20px;
  }

  .rdp-day {
    width: 47px;
    height: 47px;
    font-size: 1.1rem;
    transition: background-color 0.3s ease;
  }

  // .rdp-today {
  //   color: white;
  //   font-weight: bold;
  //   background: #424242;
  //   border-radius: 50%;
  // }

  .rdp-outside {
    color: #bdbdbd;
  }
`;

export const EventFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 1.5rem;
  padding-left: 20px;
`;

export const EventFilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 20px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({ selected }) => (selected ? '#EFE9FF' : 'transparent')};
  border: ${({ selected }) => (selected ? '1px solid #6420FF' : '1px solid #000000')};
  color: ${({ selected }) => (selected ? '#6420FF' : 'black')};
`;

export const EventIconButton = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 18px;
  left: 323px;
`;

export const Button = styled.button`
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

export const BottomDrawerBox = styled(Box)`
  width: 100%;
  height: 778px;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: -1rem;
  align-items: center;
  margin-left: 20px;
`;

export const Title = styled(Typography)`
  color: ${(props) => props.theme.color.black[900]};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 140%;
`;

export const StyledEmptyEventIcon = styled(EmptyEventIcon)`
  width: 72px;
  height: 90px;
  margin-top: 1.5rem;
`;

export const EmptyEventMessage = styled(Typography)`
  color: ${(props) => props.theme.color.main[50]};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
  line-height: 19.2px;
  letter-spacing: 0%;
  text-align: center;
  margin-top: 1.5rem;
`;

export const EventList = styled(Box)`
  width: 100%;
  height: 124px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const EventCategory = styled(Typography)`
  color: ${(props) => props.theme.color.main[100]};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.8px;
  letter-spacing: 0%;
  margin-left: 60px;
`;

export const EventName = styled(Typography)`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 18px;
  line-height: 21.6px;
  letter-spacing: 0%;
  margin-left: 35px;
  margin-top: 8px;
`;

export const EventDate = styled(Typography)`
  color: ${(props) => props.theme.color.black[400]};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.8px;
  letter-spacing: 0%;
  margin-left: 60px;
  margin-top: 8px;
`;

export const StyledNavigationBar = styled(NavigationBar)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
