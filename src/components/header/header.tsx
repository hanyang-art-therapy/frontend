import '@/tw-styles.css';

export default function Header() {
  return (
    <header className="w-full h-[40px] pl-[20px] md:pl-0 flex justify-center mx-auto bg-white fixed top-0 left-0 z-[2000]">
      <div className="w-[1080px] h-full flex items-center justify-between title-b-14">
        <div className="text-[var(--font-primary)]">
          <a href="/sitemap" className="hover:opacity-70">사이트맵</a>
        </div>
        <div className="flex gap-5 !px-5 leading-[40px] bg-[#FD9D02] text-[#fff]">
          <a href="/login" className="hover:opacity-70">로그인</a>
          <a href="/MyPage" className="hover:opacity-70">마이페이지</a>
        </div>
      </div>
    </header>
  );
};
