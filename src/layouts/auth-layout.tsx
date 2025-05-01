import AuthHeader from '@/components/header/auth-header';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='min-h-screen flex flex-col w-full'>
      <AuthHeader />
      <main className='w-full flex justify-center max-w-[1080px]'>
        <Outlet />
      </main>
    </div>
  );
}
