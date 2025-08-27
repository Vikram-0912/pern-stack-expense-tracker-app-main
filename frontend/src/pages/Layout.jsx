import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className='w-full h-screen'>
      <Header />

      <div className='p-4'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;