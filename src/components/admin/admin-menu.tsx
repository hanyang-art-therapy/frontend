import { ADMIN_MENU } from '@/constants/admin/admin-menu';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminMenu() {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState('');

  useEffect(() => {
    setSelectedMenu(location.pathname);
  }, [location.pathname]);

  return (
    <menu className='fixed top-[80px] xl:top-[120px] bg-white shadow-md rounded-lg overflow-hidden z-5'>
      {/* 타이틀 */}
      <li className='py-[15px] px-[30px] bg-bg-gray-fa t-b-18'>
        <h3>ADMIN PAGE</h3>
      </li>

      {/* 메뉴 */}
      {ADMIN_MENU.map((adminMenu) => (
        <li key={adminMenu.No}>
          <Link
            to={adminMenu.path}
            className={`py-[12px] px-[30px] text-gray-9 block ${
              selectedMenu === adminMenu.path
                ? '!text-primary !bg-bg-gray-fa t-b-16'
                : 'hover:text-black hover:bg-bg-gray-fa t-m-16'
            }`}
          >
            {adminMenu.title}
          </Link>
        </li>
      ))}
    </menu>
  );
}
