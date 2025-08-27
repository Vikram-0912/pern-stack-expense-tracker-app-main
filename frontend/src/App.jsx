import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useAuthStore } from './store/auth';

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const location = useLocation();

  return (
    <main className='bg-[#f0f2f5]'>
      <Toaster />
      <Routes>
        <Route path='/auth'>
          <Route index element={<Navigate to='/auth/sign-in' replace={true} />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>

        <Route element={<Layout />}>
          <Route
            path='/'
            element={isAuthenticated ? (
              <Navigate to='/dashboard' replace={true} />
            ) : (
              <Navigate to='/auth/sign-in' replace={true} />
            )}
          />
          <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/auth/sign-in' replace={true} />} />
          <Route path='/accounts' element={isAuthenticated ? <Accounts /> : <Navigate to='/auth/sign-in' replace={true} />} />
          <Route path='/transactions' element={isAuthenticated ? <Transactions /> : <Navigate to='/auth/sign-in' replace={true} />} />
          <Route path='/profile' element={isAuthenticated ? <Profile /> : <Navigate to='/auth/sign-in' replace={true} />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;