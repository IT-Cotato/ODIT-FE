import getDateString from '../../utils/getDateString';
import axiosInstance from '../instance';

// eslint-disable-next-line import/prefer-default-export
export const postEvents = async (event) => {
  const res = await axiosInstance.post('/api/events', {
    name: event.name,
    category: event.category,
    startDate: getDateString(event.startDate),
    endDate: getDateString(event.endDate),
    visited: false,
    imageUrlList: [],
  });

  return res;
};
