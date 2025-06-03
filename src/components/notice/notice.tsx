import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NoticeList from '@/components/notice/notice-list/notice-list';

export default function Notice() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='min-h-screen-vh mt-15 flex flex-col items-center justify-center'>
      <div className='w-full max-w-[1260px] px-5 xl:px-0 text-center'>
        <NoticeList />
        <Outlet />
      </div>
    </div>
  );
}
