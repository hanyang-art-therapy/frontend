import AdminMenu from '@/components/admin/admin-menu';
import NotFound from '@/components/not-found/not-found';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function AdminPage() {
  const { pathname } = useLocation();
  const { role } = useAuthStore();

  const navigate = useNavigate();
  const isAdminOrTester = role === 'ADMIN' || role === 'TESTER';

  useEffect(() => {
    if (!isAdminOrTester) {
      toast('관리자 권한이 없습니다.');
      navigate('/', { replace: true });
    }
  }, [role, navigate, isAdminOrTester]);

  if (pathname === '/admin') {
    return <NotFound />;
  }

  return (
    <div className='w-full max-w-[1260px] mx-auto px-[20px] xl:p-0'>
      <AdminMenu />
      <div className='w-full max-w-[1260px] min-h-[90vh] pt-[60px] md:min-h-[75vh] xl:min-h-[55vw] xl:pl-[200px] xl:pt-0 '>
        <Outlet />
      </div>
    </div>
  );
}
