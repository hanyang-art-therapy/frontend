import { signIn } from '@/apis/auth/sign-in';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import ShowPassword from '@/components/ui/show-password';
import ToolTip from '@/components/ui/tooltip';
import { useAuthStore } from '@/store/auth';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SignInForm() {
  const navigate = useNavigate();

  const { setAccessToken, setRole } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isUserIdRemember, setIsUserIdRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isUserIdInputFocused, setIsUserIdInputFocused] = useState(false);
  const [isPwInputFocused, setIsPwInputFocused] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      setUserId(userId);
      setIsUserIdRemember(true);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn({ userId: userId.trim(), password });


      if (response.role === 'ADMIN' || response.role === 'TESTER') {
        navigate('/admin/users');
      } else {
        navigate('/');
      }

      setAccessToken(response.accessToken);
      setRole(response.role);

      if (isUserIdRemember) {
        localStorage.setItem('userId', userId);
      } else {
        localStorage.removeItem('userId');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full space-y-[20px] md:p-0 px-[20px]'
    >
      <div className='relative'>
        <Input
          type='text'
          className='w-full py-[13px] px-[15px] h-[45px] border border-gray-9 rounded bg-bg-gray-fa'
          placeholder='아이디 또는 이메일'
          autoComplete='id'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onFocus={() => setIsUserIdInputFocused(true)}
          onBlur={() => setIsUserIdInputFocused(false)}
        />
        {isUserIdInputFocused && userId.length > 0 && (
          <ToolTip content='아이디 또는 이메일 입력' />
        )}
      </div>

      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className='w-full pl-[15px] py-[13px] pr-10 h-[45px] border border-gray-9 rounded bg-bg-gray-fa'
          placeholder='비밀번호'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsPwInputFocused(true)}
          onBlur={() => setIsPwInputFocused(false)}
        />

        <ShowPassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {isPwInputFocused && password.length > 0 && (
          <ToolTip content='영문 대소문자, 숫자, 특수문자(~!@#$%^&*)를 조합하여 10자 이상' />
        )}
      </div>

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
              className='t-r-14 pr-[10px] hover:underline cursor-pointer'
            >
              회원가입
            </Link>
            <span className='t-r-14'>|</span>
            <Link
              to='/find-my'
              className='t-r-14 pl-[10px] hover:underline cursor-pointer'
            >
              아이디 / 비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>

      <Button
        type='submit'
        disabled={isLoading}
        className='mt-[10px] h-[50px] w-full'
      >
        로그인
        {isLoading && <LoaderCircle className='w-4 h-4 ml-2 animate-spin' />}
      </Button>
    </form>
  );
}
