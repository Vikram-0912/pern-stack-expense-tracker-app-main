import React from "react";

const Dashboard = () => {
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl font-bold text-gray-800 my-4'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Total Balance
          </h2>
          <p className='text-2xl font-bold text-gray-900'>$10,000</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Total Income
          </h2>
          <p className='text-2xl font-bold text-green-500'>$5,000</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Total Expense
          </h2>
          <p className='text-2xl font-bold text-red-500'>$2,000</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Total Accounts
          </h2>
          <p className='text-2xl font-bold text-gray-900'>4</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;