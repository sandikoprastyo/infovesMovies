import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/vite.svg';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      // dispatch
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full z-50 mb-6'>
      <nav className='bg-[#222831] shadow-lg shadow-[#222831]-500/100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex'>
              <img src={logo} alt='Logo' />
            </div>
            <div className='flex'>
              {location.pathname != '/' && (
                <div
                  className='text-slate-200 cursor-pointer'
                  onClick={handleLogout}
                >
                  logout
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
