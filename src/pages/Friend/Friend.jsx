import React from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import FullContainer from '../../components/common/FullContainer';
import HeaderFriend from '../../components/Friend/HeaderFriend';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import BottomDrawer from '../../components/common/BottomDrawer';
import fetcher from '../../utils/fetcher';
import FriendList from './FriendList';

const Friend = () => {
  const { data } = useSWR('/api/places/friend', fetcher);

  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  const { isLoading: isCurrentLocationLoading, currentLocation } = useCurrentLocation();

  const friendPlaces = data?.data;
  React.useEffect(() => {
    if (friendPlaces?.length === 0 || !mapRef.current) {
      return;
    }

    friendPlaces.forEach((friendPlace) => {
      const { place, userList } = friendPlace;

      const markerContainer = document.createElement('div');

      markerContainer.style.backgroundImage = `url(${userList.at(0).profile})`;
      markerContainer.style.backgroundSize = 'contain';
      markerContainer.style.width = '2.5rem';
      markerContainer.style.height = '2.5rem';
      markerContainer.style.borderRadius = '50%';
      markerContainer.style.border = '1px solid #fff';
      markerContainer.style.boxShadow = '0px 0px 4px 0px rgba(0, 0, 0, 0.12)';

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        content: markerContainer,
      });

      customOverlay.setMap(mapRef.current);
    });
  }, [friendPlaces, mapRef.current]);

  React.useEffect(() => {
    if (isCurrentLocationLoading || !currentLocation || !mapContainerRef.current) {
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
      level: 3,
    };

    mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, options);
  }, [isCurrentLocationLoading, currentLocation, mapContainerRef.current]);

  return (
    <>
      <HeaderFriend />
      <StyledMap ref={mapContainerRef} />
      <FullContainer>
        <OverlayBox>
          <PointerEventsBox>
            <BottomDrawer>
              <FriendList />
            </BottomDrawer>
          </PointerEventsBox>
        </OverlayBox>
      </FullContainer>
    </>
  );
};

export default Friend;

const StyledMap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const OverlayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background: transparent;
  pointer-events: none;
`;

const PointerEventsBox = styled.div`
  pointer-events: auto;
`;
