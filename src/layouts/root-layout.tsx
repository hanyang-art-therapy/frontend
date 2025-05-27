import Header from '@/components/header/header';
import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';
import ScrollToTopButton from '@/components/common/scroll-to-top';
import { Outlet, useLoaderData } from 'react-router-dom';

export default function RootLayout() {
  useLoaderData();

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
