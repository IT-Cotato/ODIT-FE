import React from 'react';
import { createBrowserRouter } from 'react-router';
import AuthGuard from '../components/common/AuthGuard';
import addRouter from './addRouter';

const AsyncHome = React.lazy(() => import('../pages/Home/Home'));
const AsyncLogin = React.lazy(() => import('../pages/Login/Login'));
const AsyncRegister = React.lazy(() => import('../pages/Register/Register'));
const AsyncLoginKakao = React.lazy(() => import('../pages/Login/LoginKakao'));
const AsyncAdd = React.lazy(() => import('../pages/Add/AddLayout'));
const AsyncMap = React.lazy(() => import('../pages/Map/Map'));

const ROUTE_INFO = [
  {
    path: '/',
    element: <AsyncHome />,
    isAuthRequired: true,
  },

  {
    path: '/login',
    element: <AsyncLogin />,
    isAuthRequired: false,
  },
  {
    path: '/login/kakao',
    element: <AsyncLoginKakao />,
    isAuthRequired: false,
  },
  {
    path: '/register',
    element: <AsyncRegister />,
    isAuthRequired: true,
  },
  {
    path: '/add',
    element: <AsyncAdd />,
    isAuthRequired: true,
    children: addRouter,
  },
  {
    path: '/map',
    element: <AsyncMap />,
    isAuthRequired: false,
  },
];

const router = createBrowserRouter(
  ROUTE_INFO.map(({ path, element, isAuthRequired, children }) => ({
    path,
    element: isAuthRequired ? <AuthGuard>{element}</AuthGuard> : element,
    children,
  })),
);

export default router;
