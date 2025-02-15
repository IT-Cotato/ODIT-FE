/* eslint-disable no-param-reassign */
import React from 'react';
import useCurrentLocation from './useCurrentLocation';
import usePlaces from './usePlaces';
import pinFoodDefault from '../assets/icons/pin_food_default.svg';
import pinCafeDefault from '../assets/icons/pin_cafe_default.svg';
import pinHotelDefault from '../assets/icons/pin_hotel_default.svg';
import pinCultureDefault from '../assets/icons/pin_culture_default.svg';
import pinOthersDefault from '../assets/icons/pin_others_default.svg';
import pinFoodSelected from '../assets/icons/pin_food_selected.svg';
import pinCafeSelected from '../assets/icons/pin_cafe_selected.svg';
import pinHotelSelected from '../assets/icons/pin_hotel_selected.svg';
import pinCultureSelected from '../assets/icons/pin_culture_selected.svg';
import pinOthersSelected from '../assets/icons/pin_others_selected.svg';

const CATEGORY_PIN_ICON_DEFAULT_MAP = {
  FD6: pinFoodDefault,
  CE7: pinCafeDefault,
  AD5: pinHotelDefault,
  CT1: pinCultureDefault,
  AT4: pinCultureDefault,
};

const CATEGORY_PIN_ICON_SELECTED_MAP = {
  FD6: pinFoodSelected,
  CE7: pinCafeSelected,
  AD5: pinHotelSelected,
  CT1: pinCultureSelected,
  AT4: pinCultureSelected,
};

const useKakaomap = ({ mapContainerRef }) => {
  const mapRef = React.useRef(null);
  const markersRef = React.useRef([]);
  const selectedMarkersRef = React.useRef([]);

  const { isLoding: isCurrentLocationLoading, currentLocation } = useCurrentLocation();

  const { isLoading: isPlacesLoding, places, handleClickPlace } = usePlaces();

  const getDefaultIcon = (subCategory) => {
    return CATEGORY_PIN_ICON_DEFAULT_MAP[subCategory] || pinOthersDefault;
  };

  const getSelectedIcon = (subCategory) => {
    return CATEGORY_PIN_ICON_SELECTED_MAP[subCategory] || pinOthersSelected;
  };

  React.useEffect(() => {
    if (isPlacesLoding || !places || !mapRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    places.forEach((place) => {
      const markerContainer = document.createElement('div');

      markerContainer.style.backgroundImage = `url(${getDefaultIcon(place.subCategory)})`;
      markerContainer.style.backgroundSize = 'contain';
      markerContainer.style.width = '2.5rem';
      markerContainer.style.height = '2.5rem';

      markerContainer.addEventListener('click', () => {
        if (selectedMarkersRef.current.some(({ element }) => element === markerContainer)) {
          markerContainer.style.backgroundImage = `url(${getDefaultIcon(place.subCategory)})`;
          markerContainer.style.width = '2.5rem';
          markerContainer.style.height = '2.5rem';

          selectedMarkersRef.current = selectedMarkersRef.current.filter(({ element }) => element !== markerContainer);
        } else {
          markerContainer.style.backgroundImage = `url(${getSelectedIcon(place.subCategory)})`;

          markerContainer.style.width = '3.5rem';
          markerContainer.style.height = '3.825rem';

          selectedMarkersRef.current.push({ element: markerContainer, place });

          handleClickPlace(place);
        }
      });

      const customOverlay = new window.kakao.maps.CustomOverlay({
        clickable: true,
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

    window.kakao.maps.event.addListener(mapRef.current, 'click', () => {
      selectedMarkersRef.current.forEach(({ element, place }) => {
        element.style.backgroundImage = `url(${getDefaultIcon(place.subCategory)})`;
        element.style.width = '2.5rem';
        element.style.height = '2.5rem';
      });

      selectedMarkersRef.current = [];
    });
  }, [isCurrentLocationLoading, currentLocation, mapContainerRef.current]);

  return { mapRef };
};

export default useKakaomap;
