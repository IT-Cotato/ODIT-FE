import React from 'react';

const KaKaoAuth = () => {
  const authorizedCode = new URLSearchParams(window.location.search).get('code');

  React.useEffect(() => {}, []);

  return <div>로그인중...</div>;
};

export default KaKaoAuth;
