import { useState, useEffect } from 'react';
import Logo from '@/components/nav/nav-sections/nav-logo';
import NavMenu from '@/components/nav/nav-sections/nav-menu';
import { cn } from '@/lib/utils';

export default function Nav() {
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
      className={cn(
        'w-full h-[60px] flex justify-center transition-colors duration-300 box-shadow-style mx-auto fixed xl:top-[40px] top-0 left-0 z-9',
        scrolled ? 'bg-white' : 'bg-white/60'
      )}
    >
      <div className='w-full md:max-w-[1260px] h-full p-[20px] xl:p-0 flex gap-[30px] items-center justify-between whitespace-nowrap'>
        <Logo />
        <NavMenu />
      </div>
    </nav>
  );
}
