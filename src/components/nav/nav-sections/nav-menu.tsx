import HamburgerButton from '@/components/nav/nav-sections/nav-menu-btn/hamburger-button';
import { NAV_MENU } from '@/constants/nav';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavMenu() {
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();

  /* 경로가 바뀔 때마다 슬라이드 메뉴 닫기 */
  useEffect(() => {
    setIsSlideOpen(false);
    setOpenIndex(null);
  }, [location]);

  return (
    <>
      {/* 데스크탑 메뉴 */}
      <div className='hidden xl:flex items-center gap-[60px] t-m-18'>
        <ul className='flex gap-[30px] relative'>
          {NAV_MENU.map((menu, index) => (
            <li key={index} className='relative group'>
              {menu.submenu.length > 0 ? (
                <>
                  <Link to={menu.path} className='main-menu'>
                    {menu.title}
                  </Link>

                  <ul className='sub-menu t-r-16 group-hover:block'>
                    {menu.submenu.map((submenu, subIndex) => (
                      <li key={subIndex}>
                        <Link to={submenu.path}>{submenu.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={menu.path} className='main-menu'>
                  {menu.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link to='#' className='block'>
          <span className='blind'>검색</span>
          <Search className='search-btn' />
        </Link>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className='flex items-center gap-[15px] xl:hidden'>
        <Link to='#' className='block'>
          <span className='blind'>검색</span>
          <Search className='w-[24px] h-[24px]' />
        </Link>
        <HamburgerButton
          isOpen={isSlideOpen}
          onClick={() => setIsSlideOpen(!isSlideOpen)}
        />
      </div>

      {/* 모바일 메뉴 슬라이드 다운 */}
      <div
        className={`menu-wrapper nav-box-shadow absolute top-full left-0 w-full bg-white text-black xl:hidden z-50 ${
          isSlideOpen ? 'open' : ''
        }`}
      >
        <ul className="flex flex-col gap-4 p-8">
          {NAV_MENU.map((menu, index) => {
            const hasSub = menu.submenu.length > 0;
            const isOpen = openIndex === index;

            return (
              <li key={index}>
                {hasSub ? (
                  <details open={isOpen}>
                    <summary
                      className="cursor-pointer flex justify-between t-m-18"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenIndex(prev => (prev === index ? null : index));
                      }}
                    >
                      <span>{menu.title}</span>
                      <span className={`ml-2 transition-transform duration-600 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </summary>
                    <ul className={`mt-2 t-m-18 menu-wrapper ${isOpen ? 'open' : ''}`}>
                      {menu.submenu.map((sub, subIndex) => (
                        <li key={subIndex} className="px-[10px] py-[8px]">
                          <Link to={sub.path}>{sub.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link to={menu.path} className="t-m-18">
                    {menu.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
