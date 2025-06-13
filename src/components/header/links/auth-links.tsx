import { signOut } from '@/apis/auth/sign-out';
import { handleApiError } from '@/components/common/error-handler';
// import { useAuthStore } from '@/store/auth';
import { LogIn, LogOut, UserPlus, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function AuthLinks() {
  // const { accessToken, reset } = useAuthStore();
  const isSignedIn = !!localStorage.getItem('accessToken');

  const handleLogout = async () => {
    try {
      await signOut();
      // reset();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className='gap-5 px-5 xl:leading-[40px] flex w-[50vw] sm:w-[30vw] xl:w-auto xl:bg-bg-primary xl:text-white t-r-14 xl:py-0 py-5'>
      {isSignedIn ? (
        <button
          onClick={handleLogout}
          className='mobile-menu-btn group'
          aria-label='로그아웃'
        >
          <LogOut className='flex xl:hidden' size={20} />
          <span className='group-hover:underline'>로그아웃</span>
        </button>
      ) : (
        <Link
          to='/sign-in'
          className='mobile-menu-btn group'
          aria-label='로그인'
        >
          <LogIn className='flex xl:hidden' size={20} />
          <span className='group-hover:underline'>로그인</span>
        </Link>
      )}

      <span className='pointer-events-none hidden xl:block'>|</span>

      {isSignedIn ? (
        <Link
          to='/my-page/reviews'
          className='mobile-menu-btn group'
          aria-label='마이페이지'
        >
          <UserRound className='flex xl:hidden' size={20} />
          <span className='group-hover:underline'>마이페이지</span>
        </Link>
      ) : (
        <Link
          to='/sign-up'
          className='mobile-menu-btn group'
          aria-label='회원가입'
        >
          <UserPlus className='flex xl:hidden' size={20} />
          <span className='group-hover:underline'>회원가입</span>
        </Link>
      )}
    </div>
  );
}
