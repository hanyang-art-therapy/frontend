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
    <menu className='fixed w-full top-[60px] left-0 shadow-md overflow-hidden z-6 xl:top-[120px] xl:left-auto xl:w-auto xl:rounded-md'>
      {/* 타이틀 */}
      <h3 className='py-[10px] px-[20px] bg-bg-gray-fa whitespace-nowrap t-b-18 xl:py-[15px] xl:px-[30px]'>
        ADMIN PAGE
      </h3>
      <ul className='flex justify-between md:justify-start md:gap-[30px] xl:gap-0 px-[20px] xl:px-0 bg-bg-gray-fa xl:flex-col xl:bg-white'>
        {/* 메뉴 */}
        {ADMIN_MENU.map((adminMenu) => (
          <li key={adminMenu.No}>
            <Link
              to={adminMenu.path}
              className={`pt-[5px] pb-[10px] xl:py-[12px] xl:px-[30px] whitespace-nowrap text-center xl:text-left text-gray-9 block ${
                selectedMenu === adminMenu.path
                  ? '!text-primary !bg-bg-gray-fa t-b-16'
                  : 'hover:text-black hover:bg-bg-gray-fa t-m-16'
              }`}
            >
              {adminMenu.title}
            </Link>
          </li>
        ))}
      </ul>
    </menu>
  );
}
