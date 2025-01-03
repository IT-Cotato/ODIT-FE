import React from 'react';
import Home from './Home';

const HomeRedirect = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    window.location.href = '/login';
    return null;
  }

  return <Home />;
};

export default HomeRedirect;
