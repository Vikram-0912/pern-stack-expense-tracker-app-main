import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
// import Accounts from "./pages/Accounts";
// import Transactions from "./pages/Transactions";
// import Profile from "./pages/Profile";
// import Auth from "./pages/Auth";

function App() {
  const user = {}; // Replace with actual user data

  const location = useLocation();

  return (
    <main className='bg-[#f0f2f5]'>
      <Toaster />
      <Routes>
        {/* <Route path='/auth' element={<Auth />} /> */}

        <Route element={<Layout />}>
          <Route
            path='/'
            element={
              user ? (
                <Navigate to='/dashboard' replace={true} />
              ) : (
                <Navigate to='/auth' replace={true} />
              )
            }
          />
          <Route path='/dashboard' element={<Dashboard />} />
          {/* <Route path='/accounts' element={<Accounts />} /> */}
          {/* <Route path='/transactions' element={<Transactions />} /> */}
          {/* <Route path='/profile' element={<Profile />} /> */}
        </Route>
      </Routes>
    </main>
  );
}

export default App;