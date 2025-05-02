import { Search } from 'lucide-react';

export default function Nav(){
  return(
    <nav  className="w-full h-[60px] flex justify-center mx-auto bg-white/50 text-[#333] fixed top-[40px] left-0 z-[1000]" style={{boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'}}>
      <div className="w-[1080px] h-full flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-[18px] font-bold text-[#004483]">
          <img src="/images/logo.webp" alt="한양대학교 에리카" className="w-[192px] h-[30px]"/>
          <p>미술치료학과</p>
        </h1>
        <ul className="flex gap-[30px] text-[18px]">
          <li><a href="#">학과 소개</a></li>
          <li><a href="#">임상활동</a></li>
          <li><a href="/gallery">ART+THERAPY 展</a></li>
          <li><a href="#">입학 안내</a></li>
          <li><a href="#">자유 게시판</a></li>
        </ul>
        <a href="#"><Search className="w-[24px] h-[24px] text-[#333]"/></a>
      </div>
    </nav>
  );
};