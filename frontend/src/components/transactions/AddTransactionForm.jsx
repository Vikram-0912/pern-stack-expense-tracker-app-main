import { useEffect, useState } from 'react';
import { addTransaction } from './apiTransactions';
import { getAccounts } from '../accounts/apiAccounts';

export default function AddTransactionForm({ accountId, onSuccess }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [source, setSource] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const accountToUse = accountId || source;
      await addTransaction(accountToUse, { amount, description, source });
      setAmount('');
      setDescription('');
      setSource('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAccounts();
        setAccounts(res.data || []);
      } catch {}
    })();
  }, []);

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
      <select value={source} onChange={e => setSource(e.target.value)} className="border px-2 py-1 rounded w-full" required={!accountId}>
        <option value="">Select account</option>
        {accounts.map(a => <option key={a.id} value={a.id}>{a.account_name}</option>)}
      </select>
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-1 rounded">
        {loading ? 'Adding...' : 'Add Transaction'}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
