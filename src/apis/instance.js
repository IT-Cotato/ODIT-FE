import axios from 'axios';

/**
 * axiosInstance
 * default axios instance with base url and credentials
 */
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});
console.log('Base URL:', process.env.REACT_APP_BASE_URL);
console.log('Current Environment:', process.env.NODE_ENV);
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

const refreshAndRetryQueue = [];
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await axiosInstance.post('/api/auth/reissue');
          const newConfig = { ...error.config, headers: { Authorization: response.data.accessToken } };

          localStorage.setItem('token', response.data.accessToken);

          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          });
          refreshAndRetryQueue.length = 0;

          return axiosInstance(newConfig);
        } catch (err) {
          localStorage.removeItem('token');
          window.location.replace('/');
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: { ...error.config }, resolve, reject });
      });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
