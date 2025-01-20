import React from 'react';

/**
 * AuthGuard component
 */
const AuthGuard = ({ childrend }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/';
  }

  return childrend;
};

export default AuthGuard;
