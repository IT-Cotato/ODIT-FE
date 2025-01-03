import React from 'react';
import styled from '@emotion/styled';
import LoginButton from '../../components/Login/LoginButton';

const SOCIAL_LOGIN_LIST = ['kakao'];

const Login = () => {
  const renderLogo = () => {
    // TODO: 서비스 로고 추가 예정
    return <LogoContainer>ODIT</LogoContainer>;
  };

  const renderLoginButtons = () => {
    return (
      <ButtonContatiner>
        {SOCIAL_LOGIN_LIST.map((social) => (
          <LoginButton social={social} />
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
