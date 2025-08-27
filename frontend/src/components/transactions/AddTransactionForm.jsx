import { useState } from 'react';
import { addTransaction } from './apiTransactions';

export default function AddTransactionForm({ accountId, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await addTransaction(accountId, { amount, description, type });
      setAmount('');
      setDescription('');
      setType('expense');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        className="border px-2 py-1 rounded w-full"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="border px-2 py-1 rounded w-full"
      />
      <select value={type} onChange={e => setType(e.target.value)} className="border px-2 py-1 rounded w-full">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-1 rounded">
        {loading ? 'Adding...' : 'Add Transaction'}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
