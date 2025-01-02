import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeRedirect from '../pages/Home/HomeRedirect';

const AsyncLogin = React.lazy(() => import('../pages/Login/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRedirect />,
  },
  {
    path: '/login',
    element: <AsyncLogin />,
  },
]);

export default router;
