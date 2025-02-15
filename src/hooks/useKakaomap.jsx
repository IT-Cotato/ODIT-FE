import React from 'react';
import useCurrentLocation from './useCurrentLocation';
import usePlaces from './usePlaces';
import pinFoodDefault from '../assets/icons/pin_food_default.svg';
import pinCafeDefault from '../assets/icons/pin_cafe_default.svg';
import pinHotelDefault from '../assets/icons/pin_hotel_default.svg';
import pinCultureDefault from '../assets/icons/pin_culture_default.svg';
import pinOthersDefault from '../assets/icons/pin_others_default.svg';

const CATEGORY_PIN_ICON_MAP = {
  FD6: pinFoodDefault,
  CE7: pinCafeDefault,
  AD5: pinHotelDefault,
  CT1: pinCultureDefault,
  AT4: pinCultureDefault,
};

const useKakaomap = ({ mapContainerRef }) => {
  const mapRef = React.useRef(null);
  const markersRef = React.useRef([]);

  const { isLoding: isCurrentLocationLoading, currentLocation } = useCurrentLocation();

  const { isLoading: isPlacesLoding, places } = usePlaces();

  React.useEffect(() => {
    if (isPlacesLoding || !places || !mapRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    places.forEach((place) => {
      const markerContainer = document.createElement('div');

      markerContainer.style.backgroundImage = `url(${CATEGORY_PIN_ICON_MAP[place.subCategory] || pinOthersDefault})`;
      markerContainer.style.backgroundSize = 'contain';
      markerContainer.style.width = '2.5rem';
      markerContainer.style.height = '2.5rem';

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        content: markerContainer,
      });

      customOverlay.setMap(mapRef.current);
      markersRef.current.push(customOverlay);
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
