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

export const getAllEvents = async () => {
  const res = await axiosInstance.get('/api/events');

  return res.data;
};

export const getEventsById = async (event) => {
  const res = await axiosInstance.get(`/api/events/${event.id}`);

  return res.data;
};

export const getEventsByDate = async (date) => {
  const res = await axiosInstance.get(`/api/events/date?date=${date}`);

  return res.data;
};

export const deleteEvents = async (event) => {
  const res = await axiosInstance.delete(`/api/events/${event.id}`);

  return res.data;
};
