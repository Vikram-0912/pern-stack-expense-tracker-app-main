import api from '../ui/libs/api';

export const getTransactions = async () => {
  const res = await api.get('/transaction/');
  return res.data;
};

export const getDashboardInfo = async () => {
  const res = await api.get('/transaction/dashboard');
  return res.data;
};

export const addTransaction = async (accountId, data) => {
  const res = await api.post(`/transaction/add-transaction/${accountId}`, data);
  return res.data;
};

export const transferMoney = async (data) => {
  const res = await api.put('/transaction/transfer-money', data);
  return res.data;
};
