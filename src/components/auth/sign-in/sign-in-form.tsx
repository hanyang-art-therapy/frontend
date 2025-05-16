import { signIn } from '@/apis/auth/sign-in';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SignInForm() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserIdRemember, setIsUserIdRemember] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
      setUserEmail(userEmail);
      setIsUserIdRemember(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signIn(userEmail.trim(), password);
      navigate('/');

      if (isUserIdRemember) {
        localStorage.setItem('userEmail', userEmail);
      } else {
        localStorage.removeItem('userEmail');
      }
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full space-y-[20px] md:p-0 px-[20px]'>
      <Input
        type='text'
        className='w-full py-[13px] px-[20px] h-[45px] border border-[#aaa] rounded bg-bg-gray-fa'
        placeholder='이메일'
        autoComplete='email'
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />

      <Input
        type='password'
        className='w-full py-[13px] px-[20px] h-[45px] border border-[#aaa] rounded bg-bg-gray-fa'
        placeholder='비밀번호'
        autoComplete='current-password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <div className='flex items-center mt-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='remember'
              checked={isUserIdRemember}
              onCheckedChange={() => setIsUserIdRemember(!isUserIdRemember)}
            />
            <label htmlFor='remember' className='t-r-14'>
              이메일 저장
            </label>
          </div>

          <div className='ml-auto flex'>
            <Link
              to='/sign-up'
              className='t-r-14 pr-[10px] hover:underline cursor-pointer'>
              회원가입
            </Link>
            <span className='t-r-14'>|</span>
            <Link
              to='/find-my'
              className='t-r-14 pl-[10px] hover:underline cursor-pointer'>
              아이디 / 비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>

      <Button type='submit' className='mt-[10px] h-[50px] w-full'>
        로그인
      </Button>
    </form>
  );
}
