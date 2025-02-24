import axiosInstance from '../instance';

// eslint-disable-next-line import/prefer-default-export
export const postPlaces = async (place) => {
  const res = await axiosInstance.post('/api/places', {
    placeName: place.place_name,
    latitude: place.y,
    longitude: place.x,
    addressName: place.address_name,
    roadAddressName: place.road_address_name,
    subCategory: place.category_group_code,
    url: place.place_url,
    memo: place.memo,
    imageUrlList: [],
  });

  return res;
};

export const putPlaces = async (place) => {
  const res = await axiosInstance.put(`/api/places/${place.commonPlaceId}`, {
    place,
  });

  return res.data;
};

export const deletePlaces = async (place) => {
  const res = await axiosInstance.delete(`/api/places/${place.userPlaceId}`);

  return res.data;
};

export const putPlacesVisit = async (place) => {
  const res = await axiosInstance.put(`/api/places/${place.userPlaceId}/visit`);

  return res.data;
};

export const postPlacesBookMark = async (place) => {
  const res = await axiosInstance.post(`/api/places/${place.commonPlaceId}/bookMark`);

  return res.data;
};
