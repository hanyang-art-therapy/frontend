import Header from '@/components/header/header';
import Nav from '@/components/nav/page';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
