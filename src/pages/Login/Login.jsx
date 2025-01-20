import React from 'react';
import styled from '@emotion/styled';
import LoginButton from '../../components/Login/LoginButton';
import axiosInstance from '../../apis/instance';
import { ReactComponent as Logo } from '../../assets/icons/logo_medium.svg';

const SOCIAL_LOGIN_LIST = ['kakao'];

const Login = () => {
  const handleKakaoLogin = async () => {
    try {
      const res = await axiosInstance.get('api/auth/kakao');
      console.log(res);
    } catch {
      console.error('Failed to login with Kakao');
    }
  };

  const renderLogo = () => {
    return (
      <LogoContainer>
        <Logo />
      </LogoContainer>
    );
  };

  const renderLoginButtons = () => {
    return (
      <ButtonContatiner>
        {SOCIAL_LOGIN_LIST.map((social) => (
          <LoginButton social={social} onClick={handleKakaoLogin} />
        ))}
      </ButtonContatiner>
    );
  };

  return (
    <Wrapper>
      {renderLogo()}
      {renderLoginButtons()}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 1.5rem;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ButtonContatiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export default Login;
