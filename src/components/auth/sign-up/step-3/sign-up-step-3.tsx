// STEP 3: 회원가입 완료

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function SignUpStep3() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/sign-in');
  };

  return (
    <div className='flex w-full h-full flex-col gap-[60px]'>
      <span className='space-y-[30px]'>
        <p className='title-b-24'>회원가입이 완료되었습니다!</p>
        <p className='text-r-18'>
          로그인 화면으로 돌아가 다시 로그인을 해주세요.
        </p>
      </span>

      <Button className='w-[300px] h-[50px] mx-auto' onClick={handleLoginClick}>
        로그인 화면으로 이동
      </Button>
    </div>
  );
}
