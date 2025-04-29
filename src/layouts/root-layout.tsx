import Header from '@/components/common/header/header';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='container mx-auto'>
        <Outlet />
      </main>
    </div>
  );
}
