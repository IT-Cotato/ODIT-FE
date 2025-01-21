import React from 'react';

const AsyncKakaoLogin = React.lazy(() => import('../pages/Login/LoginKakao'));

const loginRouter = [
  {
    path: 'kakao',
    element: <AsyncKakaoLogin />,
  },
];

export default loginRouter;
