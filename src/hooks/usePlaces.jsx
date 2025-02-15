import useSWR from 'swr';
import fetcherWithParams from '../utils/fetcherWithParams';
import useCurrentLocation from './useCurrentLocation';
import { putPlaces } from '../apis/places';
import { PLACE_CATEGORY_CODE_MAP } from '../constant';

const usePlaces = ({ path = 'location', param = {} } = {}) => {
  const { currentLocation } = useCurrentLocation();

  const { isLoading, data, mutate } = useSWR(
    [`/api/places/${path}`, Object.keys(param).length === 0 ? currentLocation : param],
    ([url, params]) => {
      if (path === 'location' && Object.keys(params).some((key) => key !== 'latitude' && key !== 'longitude')) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return fetcherWithParams(url, params);
    },
  );

  const handleSearchKeyword = async (keyword) => {
    const res = await mutate();

    const places = res?.data;

    const trimedKeyword = keyword.toLowerCase().replace(/\s/g, '');

    if (!trimedKeyword) {
      return;
    }

    const newPlaces = places.reduce((acc, cur) => {
      const { placeName, addressName, roadAddressName, memo, subCategory } = cur;
      if (
        [placeName, addressName, roadAddressName, memo, PLACE_CATEGORY_CODE_MAP[subCategory]]
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
    const res = await mutate();

    const places = res?.data;

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
    const newPlaces = data?.data.map((p) => {
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
    places: data?.data || [],
    handleSearchKeyword,
    handleFilterCategories,
    handleVisitPlace,
  };
};

export default usePlaces;
