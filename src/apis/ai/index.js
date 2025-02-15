import axiosInstance from '../instance';

// eslint-disable-next-line import/prefer-default-export
export const PostSummary = async (url) => {
  const res = await axiosInstance.post('/api/ai/summary', {
    url,
  });

  return res.data;
};
