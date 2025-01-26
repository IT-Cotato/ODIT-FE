import React from 'react';

const AsyncAdd = React.lazy(() => import('../pages/Add/Add'));
const AsyncAddPlaceExpotLink = React.lazy(() => import('../pages/Add/Place/AddPlaceExpotLink'));
const AsyncAddPlaceLoading = React.lazy(() => import('../pages/Add/Place/AddPlaceLoading'));

const addRouter = [
  {
    path: '',
    element: <AsyncAdd />,
  },
  {
    path: 'place',
    element: <AsyncAddPlaceExpotLink />,
  },
  {
    path: 'loading',
    element: <AsyncAddPlaceLoading />,
  },
];

export default addRouter;
