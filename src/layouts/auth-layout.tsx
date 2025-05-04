import AuthHeader from '@/components/header/auth-header';
import Footer from '@/components/footer/footer';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='flex flex-col w-full'>
      <AuthHeader />
      <main className='min-h-[calc(100vh-400px)]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
