import axios from 'axios';

/**
 * axiosInstance
 * default axios instance with base url and credentials
 */
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
