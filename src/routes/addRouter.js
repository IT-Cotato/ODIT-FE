import React from 'react';

const AsyncAdd = React.lazy(() => import('../pages/Add/Add'));
const AsyncAddExpotLink = React.lazy(() => import('../pages/Add/AddExportLink'));
const AsyncAddLoading = React.lazy(() => import('../pages/Add/AddLoading'));
const AsyncAddPlace = React.lazy(() => import('../pages/Add/Place/AddPlace'));
const AsyncAddPlaceSearch = React.lazy(() => import('../pages/Add/Place/AddPlaceSeach'));
const AsyncAddPlaceSelect = React.lazy(() => import('../pages/Add/Place/AddPlaceSelect'));
const AsyncAddEventSelect = React.lazy(() => import('../pages/Add/Event/AddEventSelect'));
const AsyncAddEvent = React.lazy(() => import('../pages/Add/Event/AddEvent'));

const addRouter = [
  {
    path: '',
    element: <AsyncAdd />,
  },
  {
    path: 'export/*',
    element: <AsyncAddExpotLink />,
  },
  {
    path: 'loading/*',
    element: <AsyncAddLoading />,
  },
  {
    path: 'place/:index',
    element: <AsyncAddPlace />,
  },
  {
    path: 'search/place',
    element: <AsyncAddPlaceSearch />,
  },
  {
    path: 'select/place',
    element: <AsyncAddPlaceSelect />,
  },
  {
    path: 'select/event',
    element: <AsyncAddEventSelect />,
  },
  {
    path: 'event/:index',
    element: <AsyncAddEvent />,
  },
];

export default addRouter;
