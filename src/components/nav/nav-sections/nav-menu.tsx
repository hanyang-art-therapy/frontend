import About from '@/components/nav/nav-sections/nav-menu-list/about';
import Activities from '@/components/nav/nav-sections/nav-menu-list/activities';
import ArtTherapy from '@/components/nav/nav-sections/nav-menu-list/art-therapy';
import Admission from '@/components/nav/nav-sections/nav-menu-list/admission';
import HamburgerButton from '@/components/nav/nav-sections/nav-menu-list/hemburger-button'
import { useState } from 'react';
import { Search } from 'lucide-react';
import '@/tw-styles.css';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 데스크탑 메뉴 */}
      <div className="hidden md:flex items-center gap-[50px] title-m-18">
        <ul className="flex gap-[30px] relative">
          <li className="relative group">
            <a href="#" className="main-menu">학과 소개</a>
            <About />
          </li>
          <li className="relative group">
            <a href="#" className="main-menu">임상활동</a>
            <Activities />
          </li>
          <li className="relative group">
            <a href="/gallery" className="main-menu">ART+THERAPY 展</a>
            <ArtTherapy />
          </li>
          <li className="relative group">
            <a href="#" className="main-menu">입학 안내</a>
            <Admission />
          </li>
          <li>
            <a href="#" className="main-menu">자유 게시판</a>
          </li>
        </ul>
        <a href="#" className="block">
          <Search className="w-[24px] h-[24px] text-[#333] hover:text-[var(--font-primary)]" />
        </a>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className="flex items-center gap-4 md:hidden">
        <a href="#"><Search className="w-[24px] h-[24px]" /></a>
        <HamburgerButton onClick={() => setIsOpen(!isOpen)} aria-label="모바일 메뉴 열기" />
      </div>

      {/* 슬라이드 다운 */}
      <div className={`menu-wrapper absolute top-full left-0 w-full bg-[var(--white)] text-[var(--black)] px-8 py-8 md:hidden z-50 ${isOpen ? 'open' : ''}`}>
        <ul className="flex flex-col gap-4 text-[18px]">
          <li><a href="#">학과 소개</a></li>
          <li><a href="#">임상활동</a></li>
          <li><a href="/gallery">ART+THERAPY 展</a></li>
          <li><a href="#">입학 안내</a></li>
          <li><a href="#">자유 게시판</a></li>
        </ul>
      </div>
    </>
  );
}
