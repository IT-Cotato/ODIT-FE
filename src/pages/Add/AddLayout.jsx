import React from 'react';
import { Outlet } from 'react-router';
import HeaderSub from '../../components/common/HeaderSub';

const AddLayout = () => {
  return (
    <>
      <HeaderSub />
      <Outlet />
    </>
  );
};

export default AddLayout;
