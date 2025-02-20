import React from 'react';
import { createBrowserRouter } from 'react-router';
import AuthGuard from '../components/common/AuthGuard';
import addRouter from './addRouter';
import NotFound from '../components/common/NotFound';

const AsyncHome = React.lazy(() => import('../pages/Home/Home'));
const AsyncLogin = React.lazy(() => import('../pages/Login/Login'));
const AsyncRegister = React.lazy(() => import('../pages/Register/Register'));
const AsyncLoginKakao = React.lazy(() => import('../pages/Login/LoginKakao'));
const AsyncAdd = React.lazy(() => import('../pages/Add/AddLayout'));
const AsyncMap = React.lazy(() => import('../pages/Map/Map'));
const AsyncEvent = React.lazy(() => import('../pages/Event/Event'));
// 변경: isAuthRequired: true!! 없애거나 false로 register부터 쭉
const AsyncEventSelect = React.lazy(() => import('../pages/Event/EventSelect'));

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
    isAuthRequired: false,
  },
  {
    path: '/add',
    element: <AsyncAdd />,
    isAuthRequired: false,
    children: addRouter,
  },
  {
    path: '/map',
    element: <AsyncMap />,
    isAuthRequired: false,
  },
  {
    path: '/event',
    element: <AsyncEvent />,
    isAuthRequired: false,
  },
  {
    path: '/EventSelect',
    element: <AsyncEventSelect />,
    isAuthRequired: false,
  },
  {
    path: '*',
    element: <NotFound />,
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
