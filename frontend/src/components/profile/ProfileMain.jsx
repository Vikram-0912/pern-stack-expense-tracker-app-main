import { useEffect, useState } from 'react';
import { changePassword, getUser, updateUser } from './apiUser';

export default function ProfileMain() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [contact, setContact] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getUser();
        const u = res.user || res;
        setUser(u);
        setFirstname(u.firstname || '');
        setLastname(u.lastname || '');
        setCountry(u.country || '');
        setCurrency(u.currency || '');
        setContact(u.contact || '');
      } catch (e) {
        setError('Failed to load user');
      } finally { setLoading(false); }
    })();
  }, []);

  const onUpdate = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await updateUser({ firstname, lastname, country, currency, contact });
      setUser(res.user || user);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to update profile');
    } finally { setBusy(false); }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await changePassword({ currentPassword, newPassword, confirmPassword });
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to change password');
    } finally { setBusy(false); }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <form onSubmit={onUpdate} className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-semibold">Profile</h3>
        <input className="border px-3 py-2 rounded w-full" value={firstname} onChange={e=>setFirstname(e.target.value)} placeholder="First name" />
        <input className="border px-3 py-2 rounded w-full" value={lastname} onChange={e=>setLastname(e.target.value)} placeholder="Last name" />
        <input className="border px-3 py-2 rounded w-full" value={country} onChange={e=>setCountry(e.target.value)} placeholder="Country" />
        <input className="border px-3 py-2 rounded w-full" value={currency} onChange={e=>setCurrency(e.target.value)} placeholder="Currency" />
        <input className="border px-3 py-2 rounded w-full" value={contact} onChange={e=>setContact(e.target.value)} placeholder="Contact" />
        <button disabled={busy} className="bg-blue-600 text-white px-4 py-2 rounded">{busy ? 'Saving...' : 'Save'}</button>
      </form>
      <form onSubmit={onChangePassword} className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-semibold">Change Password</h3>
        <input type="password" className="border px-3 py-2 rounded w-full" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} placeholder="Current password" required />
        <input type="password" className="border px-3 py-2 rounded w-full" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="New password" required />
        <input type="password" className="border px-3 py-2 rounded w-full" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirm new password" required />
        <button disabled={busy} className="bg-green-600 text-white px-4 py-2 rounded">{busy ? 'Changing...' : 'Change Password'}</button>
      </form>
    </div>
  );
}
