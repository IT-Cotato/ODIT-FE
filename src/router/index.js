import React from 'react';
import { createBrowserRouter } from 'react-router';
import AuthGuard from '../components/common/AuthGuard';
import loginRouter from './loginRouter';
import addRouter from './addRouter';

const AsyncHome = React.lazy(() => import('../pages/Home/Home'));
const AsyncLogin = React.lazy(() => import('../pages/Login/Login'));
const AsyncRegister = React.lazy(() => import('../pages/Register/Register'));
const AsyncAdd = React.lazy(() => import('../pages/Add/AddLayout'));
const AsyncEvent = React.lazy(() => import('../pages/Event/Event'));

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
    children: loginRouter,
  },
  {
    path: '/register',

    element: <AsyncRegister />,
    isAuthRequired: true,
  },
  {
    path: '/add',
    element: <AsyncAdd />,
    isAuthRequired: false,
    children: addRouter,
  },
  {
    path: '/event',
    element: <AsyncEvent />,
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
