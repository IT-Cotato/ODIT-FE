import React from 'react';

const AsyncAdd = React.lazy(() => import('../pages/Add/Add'));

const addRouter = [
  {
    path: '',
    element: <AsyncAdd />,
  },
];

export default addRouter;
