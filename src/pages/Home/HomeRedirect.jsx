import React from 'react';
import { useNavigate } from 'react-router';
import Home from './Home';

const HomeRedirect = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    navigate('/login');
  }

  return <Home />;
};

export default HomeRedirect;
