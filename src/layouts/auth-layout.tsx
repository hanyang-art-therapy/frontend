import AuthHeader from '@/components/header/auth-header';
import Footer from '@/components/footer/footer';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='min-h-screen-vh flex flex-col w-full'>
      <AuthHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
