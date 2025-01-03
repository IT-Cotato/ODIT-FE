import React from 'react';
import styled from '@emotion/styled';
import { ReactComponent as KakaoIcon } from '../../assets/icons/kakao-icon.svg';

const LoginButton = ({ social, onClick }) => {
  const getButtonStyles = () => {
    if (social === 'kakao') {
      return {
        background: '#F9E007',
        text: '카카오로 로그인하기',
        icon: <StyledKakaoIcon />,
      };
    }

    return {
      background: '#FFFFFF',
      text: '',
      icon: null,
    };
  };

  const { background, text, icon } = getButtonStyles();

  return (
    <StyledButton $background={background} onClick={onClick}>
      {icon}
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: relative;
  width: 20rem;
  height: 3.75rem;
  background: ${({ $background }) => $background};
  border-radius: 0.625rem;
  border: none;
  font-size: 1rem;
  font-weight: 700;

  > svg {
    position: absolute;
    top: 50%;
    left: 1.5rem;
    transform: translateY(-50%);
  }
`;

const StyledKakaoIcon = styled(KakaoIcon)`
  width: 1.5rem;
  fill: #3e2723;
`;

export default LoginButton;
