import React from 'react';

const useCurrentLocation = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentLocation, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setIsLoading(false);
      },
      (err) => console.log(err),
    );
  }, []);

  return { isLoading, currentLocation };
};

export default useCurrentLocation;
