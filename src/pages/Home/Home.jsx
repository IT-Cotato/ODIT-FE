import React from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import FullContainer from '../../components/common/FullContainer';
import { NAVIGATION_BAR_HEIGHT } from '../../constant';

const Home = () => {
  return (
    <>
      <FullContainer height={`calc(100% - ${NAVIGATION_BAR_HEIGHT})`}>
        <h1>뿅</h1>
      </FullContainer>
      <NavigationBar />
    </>
  );
};

export default Home;
