import TransactionList from './TransactionList';
import AddTransactionForm from './AddTransactionForm';
import { useEffect, useState } from 'react';
import { getAccounts } from '../accounts/apiAccounts';

export default function TransactionsMain() {
  const [refresh, setRefresh] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getAccounts();
        const list = res.data || [];
        setAccounts(list);
        setSelected(list[0]?.id || '');
      } catch {}
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Add Transaction</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Account:</span>
        <select value={selected} onChange={e=>setSelected(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">Select account</option>
          {accounts.map(a => <option key={a.id} value={a.id}>{a.account_name}</option>)}
        </select>
      </div>
      <AddTransactionForm accountId={selected} onSuccess={() => setRefresh(r => !r)} />
      <h2 className="text-xl font-bold mt-6">All Transactions</h2>
      <TransactionList key={refresh} />
    </div>
  );
}
