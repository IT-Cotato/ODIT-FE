import React from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router';
import LoginButton from '../../components/Login/LoginButton';
import { ReactComponent as Logo } from '../../assets/icons/logo_medium.svg';
import { useSnackbar } from '../../hooks/useSnackbark';

const SOCIAL_LOGIN_LIST = ['kakao'];

const Login = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const handleKakaoLogin = () => {
    try {
      const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
      const redirectURI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
      const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;

      window.location.href = kakaoURL;
    } catch {
      navigate('.', { replace: true, state: { fail: true } });
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

  React.useEffect(() => {
    if (location.state?.fail) {
      showSnackbar({ message: '로그인에 실패했습니다. 다시 시도해주세요.' });
      navigate('.', { replace: true, state: null });
    }
  }, [location.state]);

  return (
    <>
      <Wrapper>
        {renderLogo()}
        {renderLoginButtons()}
      </Wrapper>
      <SnackbarComponent />
    </>
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
