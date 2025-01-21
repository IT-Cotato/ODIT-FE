import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { HEADER_HEIGHT } from '../../constant';
import { ReactComponent as ShevronLeft } from '../../assets/icons/chevron_l_24.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/x_24_2.svg';

const HeaderSub = ({ isShevron = true, isClose = true, text, onClickShevron, onClickClose }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      {isShevron && (
        <button type="button" className="left" onClick={onClickShevron ?? (() => navigate(-1))}>
          <ShevronLeft />
        </button>
      )}
      <HeaderText>{text}</HeaderText>
      {isClose && (
        <button type="button" className="right" onClick={onClickClose}>
          <CloseIcon />
        </button>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${HEADER_HEIGHT};
  padding: 0.5rem 0;
  box-sizing: border-box;

  > button {
    cursor: pointer;
    border: none;
    background: none;
  }

  > .left {
    position: absolute;
    left: 1.25rem;
  }

  > .right {
    position: absolute;
    right: 1.25rem;
  }
`;

const HeaderText = styled.span`
  margin-left: 3.5rem;
  color: ${({ theme }) => theme.color.black[900]};
  font-size: 1.25rem;
  font-weight: 700;
`;

export default HeaderSub;
