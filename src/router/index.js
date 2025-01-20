import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeRedirect from '../pages/Home/HomeRedirect';
import AuthGuard from '../components/common/AuthGuard';

const AsyncLogin = React.lazy(() => import('../pages/Login/Login'));
const AsyncRegister = React.lazy(() => import('../pages/Register/Register'));

const ROUTE_INFO = [
  {
    path: '/',
    element: <HomeRedirect />,
    isAuthRequired: false,
  },
  {
    path: '/login',
    element: <AsyncLogin />,
    isAuthRequired: false,
  },
  {
    path: '/register',
    element: <AsyncRegister />,
    isAuthRequired: true,
  },
];

const router = createBrowserRouter(
  ROUTE_INFO.map(({ path, element, isAuthRequired }) => ({
    path,
    element: isAuthRequired ? <AuthGuard>{element}</AuthGuard> : element,
  })),
);

export default router;
