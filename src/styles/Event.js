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
  left: 383px;
  opacity: 1;
`;

export const EventIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 18px;
  left: 423px;
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

  .rdp-today {
    color: white;
    font-weight: bold;
    background: #424242;
    border-radius: 50%;
  }

  .rdp-outside {
    color: #bdbdbd;
  }
`;
