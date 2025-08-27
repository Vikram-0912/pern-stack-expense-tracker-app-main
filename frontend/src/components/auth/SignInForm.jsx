import { useState } from 'react';
import { signIn } from './apiAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export default function SignInForm() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await signIn({ email, password });
      setAuth({ user: res.user, token: res.token });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
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
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </form>
      <div className="text-sm mt-3">No account? <Link to="/auth/sign-up" className="text-blue-600">Sign up</Link></div>
    </div>
  );
}
