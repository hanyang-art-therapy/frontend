import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';
import { SIGN_UP_PROGRESS } from '@/constants/auth/sign-up';

export default function SignUpProgress({ progress }: { progress: number }) {
  return (
    <div className='border-b border-bg-gray-d w-screen flex h-[60px]'>
      <ul className='flex items-center md:max-w-[1260px] w-full sm:px-5 justify-center sm:justify-end mx-auto'>
        {SIGN_UP_PROGRESS.map((item) => (
          <li key={item.id} className='flex items-center'>
            <p
              className={cn(
                't-m-sign-up-progress',
                item.id === progress && 'text-primary'
              )}>
              <span className='md:inline hidden'>{item.number}</span>{' '}
              <span>{item.title}</span>
            </p>

            {item.id !== 3 && <Dot className='md:mx-[10px]' size={24} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
