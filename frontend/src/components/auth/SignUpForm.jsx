import { useState } from 'react';
import { signUp } from './apiAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUpForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await signUp({ firstName, email, password });
      setSuccess('Account created. Please sign in.');
      setTimeout(() => navigate('/auth/sign-in', { replace: true }), 800);
    } catch (err) {
      setError(err?.response?.data?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
      <div className="text-sm mt-3">Already have an account? <Link to="/auth/sign-in" className="text-blue-600">Sign in</Link></div>
    </div>
  );
}
