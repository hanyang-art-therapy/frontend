import type { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';

type StepProps = {
  items: string[];
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
};

export default function Step({ items, step, setStep }: StepProps) {
  const width = `${100 / items.length || 1}%`;

  return (
    <div className='h-[50px] border-b w-full flex justify-center border-b-bg-gray'>
      <ul className='flex w-full justify-between max-w-[1080px]'>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              style={{ width }}
              className={cn(
                'border-r border-gray-300 first:border-l-1 last:border-l-0 hover:bg-orange-100 hover:text-primary transition-all duration-300',
                step === item && 'bg-orange-50 text-primary'
              )}>
              <button
                onClick={() => setStep(item)}
                className='w-full h-full flex items-center justify-center text-[18px] cursor-pointer font-medium'>
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
