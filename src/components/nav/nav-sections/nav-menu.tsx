import HamburgerButton from '@/components/nav/nav-sections/nav-menu-btn/hamburger-button';
import { NAV_MENU } from '@/constants/nav';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavMenu() {
  const [isSlideOpen, setIsSlideOpen] = useState(false);

  return (
    <>
      {/* 데스크탑 메뉴 */}
      <div className='hidden md:flex items-center gap-[50px] title-m-18'>
        <ul className='flex gap-[30px] relative'>
          {NAV_MENU.map((menu, index) => (
            <li key={index} className='relative group'>
              {menu.submenu.length > 0 ? (
                <>
                  <Link to={menu.path} className='main-menu'>
                    {menu.title}
                  </Link>
                  <ul className='sub-menu text-r-16 group-hover:block'>
                    {menu.submenu.map((submenu, subIndex) => (
                      <li key={subIndex}>
                        <a href={submenu.path}>{submenu.title}</a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a href={menu.path} className='main-menu'>
                  {menu.title}
                </a>
              )}
            </li>
          ))}
        </ul>

        <Link to='#' className='block'>
          <Search className='w-[24px] h-[24px] text-black md:hover:text-white' />
        </Link>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className='flex items-center gap-4 md:hidden'>
        <a href='#'>
          <Search className='w-[24px] h-[24px]' />
        </a>
        <HamburgerButton
          onClick={() => setIsSlideOpen(!isSlideOpen)}
          aria-label='모바일 메뉴 열기'
        />
      </div>

      {/* 슬라이드 다운 */}
      <div
        className={`menu-wrapper absolute top-full left-0 w-full bg-white text-black px-8 py-8 md:hidden z-50 ${
          isSlideOpen ? 'open' : ''
        }`}>
        <ul className='flex flex-col gap-4 text-[18px]'>
          {NAV_MENU.map((menu, index) => (
            <li key={index}>
              <Link to={menu.path}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
