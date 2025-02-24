import axiosInstance from '../instance';

// eslint-disable-next-line import/prefer-default-export
export const getLogin = async (code) => {
  const res = await axiosInstance.get('/api/auth/login', {
    params: {
      code,
    },
  });

  return res;
};
