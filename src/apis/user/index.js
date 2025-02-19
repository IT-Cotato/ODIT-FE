import axiosInstance from '../instance';

export const postUserValidation = async (nickname) => {
  const { data } = await axiosInstance.post('/api/user/validation', {
    nickname,
  });

  return data;
};

export const postUserNickname = async (nickname) => {
  const { data } = await axiosInstance.post('/api/user/nickname', {
    nickname,
  });

  return data;
};
