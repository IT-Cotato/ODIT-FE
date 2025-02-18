import React from 'react';

const AsyncFriend = React.lazy(() => import('../pages/Friend/Friend'));
const AsyncFriendAdd = React.lazy(() => import('../pages/Friend/Add/FriendAdd'));

const addRouter = [
  {
    path: '',
    element: <AsyncFriend />,
  },
  {
    path: 'add',
    element: <AsyncFriendAdd />,
  },
];

export default addRouter;
