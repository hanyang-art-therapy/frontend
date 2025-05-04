import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function FindMy() {
  const [type, setType] = useState<'id' | 'password'>('id');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleFind = () => {
    console.log('find');
  };

  return (
    <div className='w-full space-y-[20px]'>
      <div>
        <Button variant='outline' onClick={() => setType('id')}>
          아이디 찾기
        </Button>
        <Button variant='outline' onClick={() => setType('password')}>
          비밀번호 찾기
        </Button>
      </div>

      <h1>{type === 'id' ? '아이디 찾기' : '비밀번호 찾기'}</h1>
      <div className='space-y-[10px]'>
        <Input
          type='text'
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type='text'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {}
      </div>

      <Button onClick={handleFind}>
        {type === 'id' ? '아이디 찾기' : '비밀번호 찾기'}
      </Button>
    </div>
  );
}
