import React from 'react';
import { useTheme } from '@emotion/react';
import useCurrentLocation from './useCurrentLocation';
import usePlaces from './usePlaces';

const useKakaomap = ({ mapContainerRef }) => {
  const mapRef = React.useRef(null);

  const theme = useTheme();

  const { isLoding: isCurrentLocationLoading, currentLocation } = useCurrentLocation();

  const { isLoading: isPlacesLoding, places } = usePlaces();

  React.useEffect(() => {
    if (isPlacesLoding || !places || !mapRef.current) {
      return;
    }

    places.forEach((place) => {
      const markerContainer = document.createElement('div');

      markerContainer.style.width = '1.5rem';
      markerContainer.style.height = '1.5rem';
      // eslint-disable-next-line prefer-destructuring
      markerContainer.style.backgroundColor = theme.color.main[50];
      markerContainer.style.borderRadius = '50%';
      markerContainer.style.border = `1px solid ${theme.color.black[0]}`;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        content: markerContainer,
        yAnchor: 0.5,
        xAnchor: 0.5,
      });

      customOverlay.setMap(mapRef.current);
    });
  }, [isPlacesLoding, places, mapRef.current]);

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

  return { mapRef };
};

export default useKakaomap;
