import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DesktopMenu from '@/components/nav/nav-sections/nav-menu-sections/desktop-menu';
import MobileMenu from '@/components/nav/nav-sections/nav-menu-sections/mobile-menu';
import HamburgerButton from '@/components/nav/nav-sections/nav-menu-sections/hamburger-button';
// import SearchButton from '@/components/nav/nav-sections/nav-menu-sections/search-button'; 검색 기능 제외

export default function NavMenu() {
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSlideOpen(false);
  }, [location]);

  return (
    <>
      {/* 데스크탑 메뉴 */}
      <div className='hidden xl:flex items-center gap-[60px] t-m-18'>
        <DesktopMenu />
        {/*<SearchButton />*/}
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className='flex items-center gap-[15px] xl:hidden'>
        {/*<SearchButton />*/}
        <HamburgerButton
          isOpen={isSlideOpen}
          onClick={() => setIsSlideOpen(!isSlideOpen)}
        />
      </div>

      {/* 모바일 슬라이드 메뉴 */}
      {isSlideOpen && <MobileMenu />}
    </>
  );
}
