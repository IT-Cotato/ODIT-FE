import styled from '@emotion/styled';

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
