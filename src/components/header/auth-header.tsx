import Logo from '@/components/nav/nav-sections/nav-logo';
import { useLocation } from 'react-router-dom';

const subNameMap = {
  '/sign-in': '로그인',
  '/sign-up': '회원가입',
  '/find-my': '아이디 / 비밀번호 찾기',
};

export default function AuthHeader() {
  const location = useLocation();
  const subName = subNameMap[location.pathname as keyof typeof subNameMap];

  return (
    <header className='flex items-center h-15 shadow-md w-screen'>
      <div className='md:max-w-[1080px] w-full mx-auto flex justify-start'>
        <Logo subName={subName} />
      </div>
    </header>
  );
}
