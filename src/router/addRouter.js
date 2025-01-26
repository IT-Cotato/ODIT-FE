import React from 'react';

const AsyncAdd = React.lazy(() => import('../pages/Add/Add'));
const AsyncAddPlaceExpotLink = React.lazy(() => import('../pages/Add/Place/AddPlaceExportLink'));
const AsyncAddLoading = React.lazy(() => import('../pages/Add/AddLoading'));
const AsyncAddPlace = React.lazy(() => import('../pages/Add/Place/AddPlace'));
const AsyncAddSearch = React.lazy(() => import('../pages/Add/Place/AddPlaceSeach'));

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
    element: <AsyncAddLoading />,
  },
  {
    path: 'place',
    element: <AsyncAddPlace />,
  },
  {
    path: 'search',
    element: <AsyncAddSearch />,
  },
];

export default addRouter;
