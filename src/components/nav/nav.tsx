import '@/tw-styles.css';
import Logo from '@/components/nav/nav-sections/nav-logo';
import NavMenu from '@/components/nav/nav-sections/nav-menu';

export default function Header() {
  return (
    <nav className="w-full h-[60px] flex justify-center bg-white/50 nav-box-shadow fixed top-[40px] left-0 z-[1000] p-4">
      <div className="w-[1080px] h-full flex gap-[30px] items-center justify-between whitespace-nowrap">
        <Logo />
        <NavMenu />
      </div>
    </nav>
  );
}