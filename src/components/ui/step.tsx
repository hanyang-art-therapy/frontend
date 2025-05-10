import type { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';

type StepProps = {
  items: { label: string; value: string }[];
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
};

export default function Step({ items, step, setStep }: StepProps) {
  const width = `${100 / items.length || 1}%`;

  return (
    <div className='h-[50px] border-b w-full flex justify-center border-b-bg-gray-d'>
      <ul className='flex w-full justify-between md:max-w-[1280px]'>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              style={{ width }}
              className={cn(
                'border-r border-gray-300 first:border-l-1 last:border-l-0 hover:bg-orange-100 hover:text-primary transition-all duration-300',
                step === item.value && 'bg-orange-50 text-primary'
              )}>
              <button
                onClick={() => setStep(item.value)}
                className={cn(
                  'w-full h-full flex items-center justify-center cursor-pointer',
                  step === item.value
                    ? 'title-b-14 md:title-b-18'
                    : 'text-r-14 md:text-r-18'
                )}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
