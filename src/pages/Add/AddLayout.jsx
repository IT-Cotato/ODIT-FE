import React from 'react';
import { Outlet, useLocation } from 'react-router';
import HeaderSub from '../../components/common/HeaderSub';

const AddLayout = () => {
  const location = useLocation();

  const isHeader = !location.pathname.includes('loading');

  return (
    <>
      {isHeader && <HeaderSub />}
      <Outlet />
    </>
  );
};

export default AddLayout;
