import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import HeaderSub from '../../components/common/HeaderSub';

const AddLayout = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const isHeader = !location.pathname.includes('loading');

  const handleHeaderChevronClick = () => {
    if (['search', 'select'].some((path) => location.pathname.includes(path))) {
      navigate(`/add/export?type=${location.pathname.split('/').at(-1)}`);
      return;
    }

    navigate(-1);
  };

  return (
    <>
      {isHeader && <HeaderSub onClickShevron={handleHeaderChevronClick} />}
      <Outlet />
    </>
  );
};

export default AddLayout;
