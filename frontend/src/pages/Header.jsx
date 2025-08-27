import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto px-4'>
        <nav className='flex justify-between items-center py-4'>
          <Link to='/' className='text-2xl font-bold text-gray-800'>
            Expense Tracker
          </Link>
          <div>
            <Link to='/dashboard' className='px-4 text-gray-600 hover:text-gray-800'>
              Dashboard
            </Link>
            <Link to='/accounts' className='px-4 text-gray-600 hover:text-gray-800'>
              Accounts
            </Link>
            <Link to='/transactions' className='px-4 text-gray-600 hover:text-gray-800'>
              Transactions
            </Link>
            <Link to='/profile' className='px-4 text-gray-600 hover:text-gray-800'>
              Profile
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;