import { useEffect, useState } from 'react';
import { getTransactions } from './apiTransactions';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const data = await getTransactions();
        setTransactions(data.transactions || data);
      } catch (err) {
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!transactions.length) return <div>No transactions found.</div>;

  return (
    <ul className="space-y-2">
      {transactions.map((tx) => (
        <li key={tx.id} className="border p-2 rounded">
          <div><b>{tx.type}</b>: {tx.amount}</div>
          <div>{tx.description}</div>
          <div className="text-xs text-gray-500">{new Date(tx.created_at).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}
