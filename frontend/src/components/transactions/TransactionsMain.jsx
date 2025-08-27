import TransactionList from './TransactionList';
import AddTransactionForm from './AddTransactionForm';
import { useState } from 'react';

// TODO: Replace with actual account selection logic
const DEMO_ACCOUNT_ID = '1';

export default function TransactionsMain() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Add Transaction</h2>
      <AddTransactionForm accountId={DEMO_ACCOUNT_ID} onSuccess={() => setRefresh(r => !r)} />
      <h2 className="text-xl font-bold mt-6">All Transactions</h2>
      {/* Key prop forces re-mount to refresh list after add */}
      <TransactionList key={refresh} />
    </div>
  );
}
