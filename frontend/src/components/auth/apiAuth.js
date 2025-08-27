import api from '../ui/libs/api';

export const signIn = async (data) => {
  const res = await api.post('/auth/sign-in', data);
  return res.data;
};

export const signUp = async (data) => {
  const res = await api.post('/auth/sign-up', data);
  return res.data;
};
