import api from '../ui/libs/api';

export const getAccounts = async (id = '') => {
  const res = await api.get(`/account/${id}`);
  return res.data;
};

export const createAccount = async (data) => {
  const res = await api.post('/account/create', data);
  return res.data;
};

export const addMoneyToAccount = async (id, data) => {
  const res = await api.put(`/account/add-money/${id}`, data);
  return res.data;
};
