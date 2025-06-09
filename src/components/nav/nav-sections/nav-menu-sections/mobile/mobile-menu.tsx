import AuthLinks from '@/components/header/links/auth-links';
import MobileMenuItem from '@/components/nav/nav-sections/nav-menu-sections/mobile/mobile-menu-item';
import { NAV_MENU } from '@/constants/nav';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MobileMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpenIndex(null);
  }, [location]);

  return (
    <div className='menu-wrapper box-shadow-style absolute top-full left-0 w-full bg-white text-black xl:hidden z-9 open'>
      <div className='justify-center flex w-full'>
        <AuthLinks />
      </div>

      <div className='w-full h-[1px] bg-bg-gray-d' />

      <ul className='flex flex-col gap-4 p-8'>
        {NAV_MENU.map((menu, index) => (
          <MobileMenuItem
            key={menu.title}
            menu={menu}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </ul>
    </div>
  );
}
