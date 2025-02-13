import React from 'react';
import useSWR from 'swr';
import fetcherWithParams from '../utils/fetcherWithParams';
import useCurrentLocation from './useCurrentLocation';
import { putPlaces } from '../apis/places';
import { PLACE_CATEGORY_CODE_MAP } from '../constant';

const usePlaces = ({ path = 'location', param = {} } = {}) => {
  const { currentLocation } = useCurrentLocation();

  const { isLoading, data, mutate } = useSWR(
    [`/api/places/${path}`, Object.keys(param).length === 0 ? currentLocation : param],
    ([url, params]) => fetcherWithParams(url, params),
  );

  const places = data?.data || [];

  const handleSearchKeyword = async (keyword) => {
    await mutate();

    const trimedKeyword = keyword.toLowerCase().replace(/\s/g, '');

    if (!trimedKeyword) {
      return;
    }

    const newPlaces = places.reduce((acc, cur) => {
      const { placeName, addressName, roadAddressName, memo, subCategory } = cur;
      // console.log([placeName, addressName, roadAddressName, memo].map((str) => str.toLowerCase().replace(/\s/g, '')));
      if (
        // [placeName, addressName, roadAddressName, memo, PLACE_CATEGORY_CODE_MAP[subCategory]]
        [placeName, addressName, roadAddressName, memo]
          .map((str) => str.toLowerCase().replace(/\s/g, ''))
          .some((str) => str.includes(trimedKeyword))
      ) {
        return [...acc, cur];
      }

      return acc;
    }, []);

    if (newPlaces.length > 0) {
      mutate(
        {
          ...data,
          data: newPlaces,
        },
        false,
      );
    }
  };

  const handleFilterCategories = async (categories) => {
    await mutate();

    if (categories.includes('ALL')) {
      return;
    }

    const newPlaces = places.reduce((acc, cur) => {
      if (categories.includes(cur.subCategory)) {
        return [...acc, cur];
      }

      return acc;
    }, []);

    mutate(
      {
        ...data,
        data: newPlaces,
      },
      false,
    );
  };

  const handleVisitPlace = async (place) => {
    const newPlaces = places.map((p) => {
      if (p.commonPlaceId === place.commonPlaceId) {
        return { ...p, visited: !p.visited };
      }
      return p;
    });

    mutate(putPlaces(place), {
      optimisticData: newPlaces,
    });
  };

  return {
    isLoading,
    places,
    handleSearchKeyword,
    handleFilterCategories,
    handleVisitPlace,
  };
};

export default usePlaces;
