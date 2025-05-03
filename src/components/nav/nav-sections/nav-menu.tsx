import About from '@/components/nav/nav-sections/nav-menu-list/about';
import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
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
            <a href="#">임상활동</a>
            <ul className="absolute top-full left-0 mt-2 w-max bg-white text-sm shadow-lg p-2 hidden group-hover:block z-50">
              <li><a href="#">발달장애</a></li>
              <li><a href="#">유아</a></li>
              <li><a href="#">아동</a></li>
              <li><a href="#">청소년</a></li>
              <li><a href="#">성인</a></li>
              <li><a href="#">노인</a></li>
            </ul>
          </li>

          <li className="relative group">
            <a href="/gallery">ART+THERAPY 展</a>
            <ul className="absolute top-full left-0 mt-2 w-max bg-white text-sm shadow-lg p-2 hidden group-hover:block z-50">
              <li><a href="#">전시 소개</a></li>
              <li><a href="#">미술관 미술치료</a></li>
              <li><a href="#">갤러리</a></li>
            </ul>
          </li>

          <li className="relative group">
            <a href="#">입학 안내</a>
            <ul className="absolute top-full left-0 mt-2 w-max bg-white text-sm shadow-lg p-2 hidden group-hover:block z-50">
              <li><a href="#">장학금 혜택</a></li>
              <li><a href="#">신입학생 모집</a></li>
            </ul>
          </li>

          <li>
            <a href="#">자유 게시판</a>
          </li>
        </ul>

        <a href="#" className="block">
          <Search className="w-[24px] h-[24px] text-[#333]" />
        </a>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <div className="flex items-center gap-4 md:hidden">
        <a href="#"><Search className="w-[24px] h-[24px] text-[#333]" /></a>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="모바일 메뉴 열기">
          <Menu className="w-[28px] h-[28px] text-[#333]" />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {isOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white text-[#333] px-4 py-6 md:hidden shadow-md z-50">
          <ul className="flex flex-col gap-4 text-[18px]">
            <li><a href="#">학과 소개</a></li>
            <li><a href="#">임상활동</a></li>
            <li><a href="/gallery">ART+THERAPY 展</a></li>
            <li><a href="#">입학 안내</a></li>
            <li><a href="#">자유 게시판</a></li>
          </ul>
        </div>
      )}
    </>
  );
}
