import styled from '@emotion/styled/macro';
import React from 'react';
import { useTheme } from '@emotion/react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import MapList from './MapList';
import usePlaces from '../../hooks/usePlaces';
import BottomDrawer from '../../components/common/BottomDrawer';
import useDebounce from '../../hooks/useDebounce';

const Map = () => {
  const [searchText, setSearchText] = React.useState('');

  const debouncedSearchText = useDebounce({ value: searchText, delay: 500 });

  const { isLoading: isLocationLoading, currentLocation } = useCurrentLocation();
  const { isLodaing: isPlacesLoading, places, handleSearchKeyword } = usePlaces();

  const mapRef = React.useRef(null);
  const mapContainerRef = React.useRef(null);

  const theme = useTheme();

  const handleSearchTextChange = (changedText) => {
    setSearchText(changedText);
  };

  const renderMarker = () => {
    if (!mapRef.current) {
      return;
    }

    const markerContainer = document.createElement('div');
    markerContainer.style.width = '1.5rem';
    markerContainer.style.height = '1.5rem';
    // eslint-disable-next-line prefer-destructuring
    markerContainer.style.backgroundColor = theme.color.main[50];
    markerContainer.style.borderRadius = '50%';
    markerContainer.style.border = `1px solid ${theme.color.black[0]}`;

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
      content: markerContainer,
      yAnchor: 0.5,
      xAnchor: 0.5,
    });

    customOverlay.setMap(mapRef.current);
  };

  React.useEffect(() => {
    handleSearchKeyword(debouncedSearchText);
  }, [debouncedSearchText]);

  React.useEffect(() => {
    if (isPlacesLoading || !places || !mapRef.current) {
      return;
    }

    renderMarker();
  }, [isPlacesLoading, places]);

  React.useEffect(() => {
    if (isLocationLoading || !currentLocation || !mapContainerRef.current) {
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(currentLocation.latitude, currentLocation.longitude),
      level: 3,
    };

    mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, options);
  }, [isLocationLoading, currentLocation]);

  return (
    <>
      <StyledMap ref={mapContainerRef} />
      <OverlayBox>
        <PointerEventsBox>
          <TextFieldLarge
            hasSearchAdornment
            placeholder="내가 저장한 장소를 검색하세요."
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </PointerEventsBox>
      </OverlayBox>
      <PointerEventsBox>
        <BottomDrawer open blocking={false}>
          <MapList />
        </BottomDrawer>
      </PointerEventsBox>
    </>
  );
};

export default Map;

const StyledMap = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const OverlayBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background: transparent;
  pointer-events: none;
`;

const PointerEventsBox = styled.div`
  pointer-events: auto;
`;
