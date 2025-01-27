import axios from 'axios';

/**
 * axiosInstance
 * default axios instance with base url and credentials
 */
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token,
    },
  };
});

export default axiosInstance;
