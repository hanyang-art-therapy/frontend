import ScrollToTopButton from '@/components/common/scroll-to-top';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Nav from '@/components/nav/nav';
import { Outlet } from 'react-router-dom';

export default function IntroLayout() {
  return (
    <div className='relative'>
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
