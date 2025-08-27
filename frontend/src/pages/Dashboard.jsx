import React, { useEffect, useState } from "react";
import { getDashboardInfo } from "../components/transactions/apiTransactions";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getDashboardInfo();
        setData(res);
      } catch (e) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className='container mx-auto px-4'>Loading...</div>;
  if (error) return <div className='container mx-auto px-4 text-red-600'>{error}</div>;

  const { availableBalance = 0, totalIncome = 0, totalExpense = 0, lastAccount = [], lastTransactions = [] } = data || {};

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold text-gray-800 my-4'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>Total Balance</h2>
          <p className='text-2xl font-bold text-gray-900'>{availableBalance}</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>Total Income</h2>
          <p className='text-2xl font-bold text-green-500'>{totalIncome}</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>Total Expense</h2>
          <p className='text-2xl font-bold text-red-500'>{totalExpense}</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>Total Accounts</h2>
          <p className='text-2xl font-bold text-gray-900'>{lastAccount?.length || 0}</p>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-semibold mb-2'>Recent Accounts</h3>
          <ul className='space-y-2'>
            {lastAccount?.map((a) => (
              <li key={a.id} className='border p-2 rounded'>
                <div className='font-medium'>{a.account_name}</div>
                <div className='text-sm text-gray-600'>Balance: {a.account_balance}</div>
              </li>
            ))}
            {!lastAccount?.length && <li className='text-sm text-gray-500'>No recent accounts</li>}
          </ul>
        </div>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-semibold mb-2'>Recent Transactions</h3>
          <ul className='space-y-2'>
            {lastTransactions?.map((t) => (
              <li key={t.id} className='border p-2 rounded'>
                <div className='font-medium'>{t.description}</div>
                <div className='text-sm text-gray-600'>{t.type} - {t.amount} - {t.status}</div>
              </li>
            ))}
            {!lastTransactions?.length && <li className='text-sm text-gray-500'>No recent transactions</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;