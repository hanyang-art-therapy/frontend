import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import HamburgerButton from '@/components/nav/nav-sections/nav-menu-btn/hamburger-button';
import { NAV_MENU } from '@/constants/nav';

export default function NavMenu() {
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsSlideOpen(false);
    setOpenIndex(null);
  }, [location]);

  return (
    <>
      {/* 데스크탑 메뉴 */}
      <div className="hidden xl:flex items-center gap-[60px] t-m-18">
        <ul className="flex gap-[30px] relative">
          {NAV_MENU.map((menu, index) => (
            <li key={index} className="relative group">
              {menu.submenu.length > 0 ? (
                <>
                  <Link to={menu.path} className="main-menu">
                    {menu.title}
                  </Link>
                  <ul className="sub-menu t-r-16 group-hover:block">
                    {menu.submenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <Link to={sub.path}>{sub.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={menu.path} className="main-menu">
                  {menu.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link to="#" className="block">
          <span className="blind">검색</span>
          <Search className="search-btn" />
        </Link>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className="flex items-center gap-[15px] xl:hidden">
        <Link to="#" className="block">
          <span className="blind">검색</span>
          <Search className="w-[24px] h-[24px]" />
        </Link>
        <HamburgerButton
          isOpen={isSlideOpen}
          onClick={() => setIsSlideOpen(!isSlideOpen)}
        />
      </div>

      {/* 모바일 슬라이드 메뉴 */}
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
                  <>
                    <button
                      type="button"
                      className="w-full flex justify-between items-center t-m-18"
                      onClick={() =>
                        setOpenIndex((prev) => (prev === index ? null : index))
                      }
                    >
                      <span>{menu.title}</span>
                      <span
                        className={`transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    <ul
                      className={`menu-wrapper mt-2 t-m-18 ${
                        isOpen ? 'open' : ''
                      }`}
                    >
                      {menu.submenu.map((sub, subIndex) => (
                        <li key={subIndex} className="px-[10px] py-[8px]">
                          <Link to={sub.path}>{sub.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={menu.path} className="t-m-18 block">
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
