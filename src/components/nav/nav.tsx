import { useState, useEffect } from 'react';
import Logo from '@/components/nav/nav-sections/nav-logo';
import NavMenu from '@/components/nav/nav-sections/nav-menu';

export default function Nav() {
  {
    /* 스크롤 10px 이상 내렸을 때 배경 색상 흰색으로 변경 */
  }
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        w-full h-[60px] flex justify-center fixed top-[40px] left-0 z-98 nav-box-shadow transition-colors duration-300 p-[20px] xl:p-0
        ${scrolled ? 'bg-white' : 'bg-white/50'}
      `}>
      <div className='w-full xl:w-[1080px] h-full flex gap-[30px] items-center justify-between whitespace-nowrap'>
        <Logo />
        <NavMenu />
      </div>
    </nav>
  );
}
