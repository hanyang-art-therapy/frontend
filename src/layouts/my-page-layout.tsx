import MyPageHeader from '@/components/header/my-page-header';
import { Outlet } from 'react-router-dom';

export default function MyPageLayout() {
  return (
    <div className='min-h-screen flex flex-col w-full'>
      <MyPageHeader />
      <main className='w-full flex justify-center max-w-[1080px]'>
        <Outlet />
      </main>
    </div>
  );
}
