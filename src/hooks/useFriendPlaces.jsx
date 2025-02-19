import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { PLACE_CATEGORY_CODE_MAP } from '../constant';

const useFriendPlaces = () => {
  const { isLoading, data, mutate } = useSWR('/api/places/friend', fetcher);

  const handleSearchKeyword = async (keyword) => {
    const res = await mutate();

    const places = res?.data.map((friendPlace) => friendPlace.place) || [];

    const trimedKeyword = keyword.toLowerCase().replace(/\s/g, '');

    if (!trimedKeyword) {
      return;
    }

    const newPlaces = places.filter((place) => {
      const { placeName, addressName, roadAddressName, subCategory } = place;

      return [placeName, addressName, roadAddressName, PLACE_CATEGORY_CODE_MAP[subCategory] ?? '']
        .map((str) => str.toLowerCase().replace(/\s/g, ''))
        .some((str) => str.toLowerCase().includes(trimedKeyword));
    });

    const newFriendPlaces = newPlaces.map((place) => {
      return {
        place,
        userList: res.data.find((friendPlace) => friendPlace.place.id === place.id).userList,
      };
    });

    mutate(
      {
        data: newFriendPlaces,
      },
      false,
    );
  };

  const handleFilterCategories = async (categories) => {
    const res = await mutate();

    const places = res?.data.map((friendPlace) => friendPlace.place) || [];

    if (categories.includes('ALL')) {
      return;
    }

    const newPlaces = places.filter((place) => categories.includes(place.subCategory));

    const newFriendPlaces = newPlaces.map((place) => {
      return {
        place,
        userList: res.data.find((friendPlace) => friendPlace.place.id === place.id).userList,
      };
    });

    mutate(
      {
        data: newFriendPlaces,
      },
      false,
    );
  };

  return {
    isLoading,
    friendPlaces: data?.data || [],
    handleSearchKeyword,
    handleFilterCategories,
  };
};

export default useFriendPlaces;
