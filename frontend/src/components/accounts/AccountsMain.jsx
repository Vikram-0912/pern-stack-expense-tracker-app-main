import { useEffect, useState } from 'react';
import { addMoneyToAccount, createAccount, getAccounts } from './apiAccounts';

export default function AccountsMain() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const [depositId, setDepositId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAccounts();
      setAccounts(res.data || []);
    } catch (e) {
      setError('Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await createAccount({ name, account_number: accountNumber, amount });
      setName(''); setAccountNumber(''); setAmount('');
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to create account');
    } finally { setBusy(false); }
  };

  const onDeposit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await addMoneyToAccount(depositId, { amount: depositAmount });
      setDepositAmount('');
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to add money');
    } finally { setBusy(false); }
  };

  if (loading) return <div>Loading accounts...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Your Accounts</h3>
        <ul className="space-y-2">
          {accounts.map((a) => (
            <li key={a.id} className="border p-2 rounded">
              <div className="font-medium">{a.account_name}</div>
              <div className="text-sm text-gray-600">#{a.account_number} - Balance: {a.account_balance}</div>
            </li>
          ))}
          {!accounts.length && <li className="text-sm text-gray-500">No accounts found.</li>}
        </ul>
      </div>
      <div className="space-y-6">
        <form onSubmit={onCreate} className="bg-white p-4 rounded shadow space-y-2">
          <h3 className="font-semibold">Create Account</h3>
          <input className="border px-3 py-2 rounded w-full" value={name} onChange={e=>setName(e.target.value)} placeholder="Account name" required />
          <input className="border px-3 py-2 rounded w-full" value={accountNumber} onChange={e=>setAccountNumber(e.target.value)} placeholder="Account number" required />
          <input type="number" className="border px-3 py-2 rounded w-full" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Initial amount" required />
          <button disabled={busy} className="bg-blue-600 text-white px-4 py-2 rounded">{busy ? 'Saving...' : 'Create'}</button>
        </form>
        <form onSubmit={onDeposit} className="bg-white p-4 rounded shadow space-y-2">
          <h3 className="font-semibold">Add Money</h3>
          <select className="border px-3 py-2 rounded w-full" value={depositId} onChange={e=>setDepositId(e.target.value)} required>
            <option value="" disabled>Select account</option>
            {accounts.map(a => <option key={a.id} value={a.id}>{a.account_name}</option>)}
          </select>
          <input type="number" className="border px-3 py-2 rounded w-full" value={depositAmount} onChange={e=>setDepositAmount(e.target.value)} placeholder="Amount" required />
          <button disabled={busy} className="bg-green-600 text-white px-4 py-2 rounded">{busy ? 'Processing...' : 'Add Money'}</button>
        </form>
      </div>
    </div>
  );
}
