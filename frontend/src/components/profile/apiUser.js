import api from '../ui/libs/api';

export const getUser = async () => {
  const res = await api.get('/user/');
  return res.data;
};

export const updateUser = async (data) => {
  const res = await api.put('/user/', data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put('/user/change-password', data);
  return res.data;
};
