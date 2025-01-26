import React from 'react';
import { Stack } from '@mui/material';

const AddSearchList = ({ searchResult }) => {
  console.log(searchResult[0]);
  return (
    <Stack>
      {searchResult.map((place) => (
        <div key={place.place_url}>{place.place_name}</div>
      ))}
    </Stack>
  );
};

export default AddSearchList;
