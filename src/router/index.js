import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeRedirect from '../pages/Home/HomeRedirect';

const AsyncLogin = React.lazy(() => import('../pages/Login/Login'));
const AsyncRegister = React.lazy(() => import('../pages/Register/Register'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRedirect />,
  },
  {
    path: '/login',
    element: <AsyncLogin />,
  },
  {
    path: '/register',
    element: <AsyncRegister />,
  },
]);

export default router;
