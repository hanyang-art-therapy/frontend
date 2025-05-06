import Header from '@/components/header/header';
import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className='flex flex-col relative'>
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
