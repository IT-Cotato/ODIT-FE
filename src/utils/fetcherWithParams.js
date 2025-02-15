import axiosInstance from '../apis/instance';

/**
 * Fetcher function to fetch data from the server (use in SWR)
 * @param {string} url - URL to fetch data from
 * @param {*} params - Parameters to send with the request
 * @returns
 */
const fetcherWithParams = (url, params) => axiosInstance.get(url, { params }).then((res) => res.data);

export default fetcherWithParams;
