import { create } from 'zustand';

const persistedAuth = (() => {
  try {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
})();

export const useAuthStore = create((set, get) => ({
  user: persistedAuth.user,
  token: persistedAuth.token,
  isAuthenticated: !!persistedAuth.token,
  setAuth: ({ user, token }) => {
    const next = { user, token };
    localStorage.setItem('auth', JSON.stringify(next));
    set({ user, token, isAuthenticated: !!token });
  },
  clearAuth: () => {
    localStorage.removeItem('auth');
    set({ user: null, token: null, isAuthenticated: false });
  },
  updateUser: (user) => {
    const { token } = get();
    const next = { user, token };
    localStorage.setItem('auth', JSON.stringify(next));
    set({ user });
  },
}));

