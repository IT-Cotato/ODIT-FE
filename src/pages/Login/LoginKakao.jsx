import React from 'react';
import { useNavigate } from 'react-router';
import { getLogin } from '../../apis/auth';

const LoginKakao = () => {
  const navigate = useNavigate();

  const authorizedCode = new URLSearchParams(window.location.search).get('code');

  React.useEffect(() => {
    const login = async () => {
      try {
        const res = await getLogin(authorizedCode);

        if (res?.data) {
          const token = res.headers.authorization;

          localStorage.setItem('token', token);

          if (res.data.data.role === 'GUEST') {
            navigate('/register');
          } else {
            navigate('/');
          }
        } else {
          throw new Error(res?.error);
        }
      } catch {
        navigate('/login', {
          state: {
            fail: true,
          },
        });
      }
    };

    login();
  }, []);

  return <div>로그인중...</div>;
};

export default LoginKakao;
