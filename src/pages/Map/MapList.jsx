import React from 'react';
import { Stack } from '@mui/material';
import TextFieldLarge from '../../components/common/TextFieldLarge';
import usePlaces from '../../hooks/usePlaces';
import MapListItem from '../../components/Map/MapListItem';
import useIsBottomDrawerFullOpenStore from '../../stores/useIsBottomDrawerFullOpenStore';

const MapList = () => {
  const { isBottomDrawerFullOpen } = useIsBottomDrawerFullOpenStore();

  const { places } = usePlaces();

  return (
    <Stack sx={{ gap: '1rem', width: '100%', height: '100%', flex: '1', overflow: 'scroll' }}>
      {places?.map((place) => (
        <MapListItem key={place.commonPlaceId} place={place} />
      ))}
    </Stack>
  );
};

export default MapList;
