import AdminMenu from '@/components/admin/admin-menu';
import NotFound from '@/components/not-found/not-found';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function AdminPage() {
  const { pathname } = useLocation();

  if (pathname === '/admin') {
    return <NotFound />;
  }

  return (
    <div className='w-full max-w-[1260px] mx-auto px-[20px] xl:p-0'>
      <AdminMenu />
      <div className='w-full max-w-[1260px] pl-[200px]'>
        <Outlet />
      </div>
    </div>
  );
}
