import HamburgerButton from '@/components/nav/nav-sections/nav-menu-btn/hemburger-button';
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
            <p className="main-menu">학과 소개</p>
            <ul className="sub-menu text-r-16 group-hover:block">
                <li><a href="#">미래상</a></li>
                <li><a href="#">교수진</a></li>
                <li><a href="#">교육 과정</a></li>
                <li><a href="#">자격증</a></li>
                <li><a href="#">졸업 후 전망</a></li>
                <li><a href="#">MOU기관</a></li>
                <li><a href="#">오시는 길</a></li>
            </ul>
          </li>
          <li className="relative group">
            <p className="main-menu">임상활동</p>
            <ul className="sub-menu text-r-16 group-hover:block">
                <li><a href="#">발달장애</a></li>
                <li><a href="#">유아</a></li>
                <li><a href="#">아동</a></li>
                <li><a href="#">청소년</a></li>
                <li><a href="#">성인</a></li>
                <li><a href="#">노인</a></li>
            </ul>
          </li>
          <li className="relative group">
            <p className="main-menu">ART+THERAPY 展</p>
            <ul className="sub-menu text-r-16 group-hover:block">
                <li><a href="#">전시 소개</a></li>
                <li><a href="#">미술관 미술치료</a></li>
                <li><a href="/gallery">갤러리</a></li>
            </ul>
          </li>
          <li className="relative group">
            <p className="main-menu">입학 안내</p>
            <ul className="sub-menu text-r-16 group-hover:block">
                <li><a href="#">장학금 혜택</a></li>
                <li><a href="#">신입학생 모집</a></li>
            </ul>
          </li>
          <li>
            <a href="#" className="main-menu">자유 게시판</a>
          </li>
        </ul>
        <a href="#" className="block">
          <Search className="w-[24px] h-[24px] text-[#333] md:hover:text-[var(--white)]" />
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
