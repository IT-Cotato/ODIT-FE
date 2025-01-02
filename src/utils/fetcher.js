import axiosInstance from '../apis/instance';

/**
 * Fetcher function to fetch data from the server (use in SWR)
 */
const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export default fetcher;
