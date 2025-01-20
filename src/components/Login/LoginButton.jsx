import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { ReactComponent as KakaoIcon } from '../../assets/icons/kakao-icon.svg';

const LoginButton = ({ social, onClick }) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    if (social === 'kakao') {
      return {
        background: '#F9E007',
        text: '카카오로 로그인하기',
        color: theme.color.black[900],
        icon: <StyledKakaoIcon />,
      };
    }

    return {
      background: '#FFFFFF',
      text: '',
      icon: null,
    };
  };

  const { background, text, color, icon } = getButtonStyles();

  return (
    <StyledButton $background={background} $color={color} onClick={onClick}>
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
  color: ${({ $color }) => $color};
  font-weight: 700;
  cursor: pointer;

  > svg {
    position: absolute;
    top: 50%;
    left: 1.5rem;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const StyledKakaoIcon = styled(KakaoIcon)`
  width: 1.5rem;
  fill: #3e2723;
`;

export default LoginButton;
