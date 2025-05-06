import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isUserIdRemember, setIsUserIdRemember] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      setUserId(userId);
      setIsUserIdRemember(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log({ username: userId, password });

    if (isUserIdRemember) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full space-y-[20px] md:p-0 px-[15px]'>
      <Input
        type='text'
        className='w-full py-[13px] px-[15px] h-[45px] border border-[#aaa] rounded bg-bg-muted'
        placeholder='아이디'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <Input
        type='current-password'
        className='w-full py-[13px] px-[15px] h-[45px] border border-[#aaa] rounded bg-bg-muted'
        placeholder='비밀번호'
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
            <label htmlFor='remember' className='text-r-14'>
              아이디 저장
            </label>
          </div>

          <div className='ml-auto flex'>
            <Link
              to='/sign-up'
              className='text-r-14 pr-[10px] hover:underline cursor-pointer'>
              회원가입
            </Link>
            <span className='text-r-14'>|</span>
            <Link
              to='/find-my'
              className='text-r-14 pl-[10px] hover:underline cursor-pointer'>
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
