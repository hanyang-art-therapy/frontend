import { getUserId } from '@/apis/auth/init-auth';
import { signOut } from '@/apis/auth/sign-out';
import { handleApiError } from '@/components/common/error-handler';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function AuthLinks() {
  const [userNo, setUserNo] = useState<string>();

  useEffect(() => {
    getUserId().then((userNo) => {
      setUserNo(userNo);
    });
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className='flex gap-5 px-5 leading-[40px] bg-bg-primary text-white t-b-14'>
      {userNo ? (
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

      {userNo ? (
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
