import React from 'react';
import { useNavigate } from 'react-router';
import { getLogin } from '../../apis/auth';
import AuthGuard from '../../components/common/AuthGuard';

const LoginKakao = () => {
  const navigate = useNavigate();

  const authorizedCode = new URLSearchParams(window.location.search).get('code');

  React.useEffect(() => {
    const login = async () => {
      try {
        const data = await getLogin(AuthGuard);
      } catch {
        navigate('login', {
          state: {
            fail: true,
          },
        });
      }
    };

    login();
  }, []);

  if (!authorizedCode) {
    // navigate('/login', search: );
  }

  return <div>로그인중...</div>;
};

export default LoginKakao;
