import { cn } from '@/lib/utils';
import { Dot } from 'lucide-react';
import { SIGN_UP_PROGRESS } from '@/constants/auth/sign-up';

export default function SignUpProgress({ progress }: { progress: number }) {
  return (
    <div className='border-b border-bg-gray-d w-screen flex h-[60px] mb-[60px]'>
      <ul className='flex items-center  md:max-w-[1080px] w-full justify-center md:justify-end mx-auto text-sm md:t-m-18'>
        {SIGN_UP_PROGRESS.map((item) => (
          <li key={item.id} className='flex items-center'>
            <span className={cn(item.id === progress && 'text-primary')}>
              {item.number} {item.title}
            </span>

            {item.id !== 3 && <Dot className='md:mx-[10px]' size={24} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
