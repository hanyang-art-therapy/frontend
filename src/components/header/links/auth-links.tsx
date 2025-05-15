import { signOut } from '@/apis/auth/sign-out';
import { handleApiError } from '@/components/common/error-handler';
import AuthLinksSkeleton from '@/components/header/links/auth-links-skeleton';
import { useAuthStore } from '@/store/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AuthLinks() {
  const { accessToken, reset } = useAuthStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await signOut();
      reset();
      navigate('/');
      toast.success(response.message);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  if (accessToken === undefined) {
    return <AuthLinksSkeleton />;
  }

  return (
    <div className='flex gap-5 px-5 leading-[40px] bg-bg-primary text-white t-b-14'>
      {accessToken ? (
        <button
          onClick={handleLogout}
          className='hover:opacity-70 cursor-pointer'>
          로그아웃
        </button>
      ) : (
        <Link to='/sign-in' className='hover:opacity-70'>
          로그인
        </Link>
      )}

      {accessToken ? (
        <Link to='/my-page' className='hover:opacity-70'>
          마이페이지
        </Link>
      ) : (
        <Link to='/sign-up' className='hover:opacity-70'>
          회원가입
        </Link>
      )}
    </div>
  );
}
