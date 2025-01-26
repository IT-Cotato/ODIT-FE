import React from 'react';

const AsyncAdd = React.lazy(() => import('../pages/Add/Add'));
const AsyncAddPlaceExpotLink = React.lazy(() => import('../pages/Add/Place/AddPlaceExpotLink'));
const AsyncAddPlaceLoading = React.lazy(() => import('../pages/Add/Place/AddPlaceLoading'));
const AsyncAddPlace = React.lazy(() => import('../pages/Add/Place/AddPlace'));

const addRouter = [
  {
    path: '',
    element: <AsyncAdd />,
  },
  {
    path: 'export',
    element: <AsyncAddPlaceExpotLink />,
  },
  {
    path: 'loading',
    element: <AsyncAddPlaceLoading />,
  },
  {
    path: 'place',
    element: <AsyncAddPlace />,
  },
];

export default addRouter;
