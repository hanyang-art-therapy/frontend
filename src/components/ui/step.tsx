import { cn } from '@/lib/utils';

type StepProps = {
  items: { label: string; path: string }[];
  step: string;
  setStep: (step: string) => void;
};

export default function Step({ items, step, setStep }: StepProps) {
  return (
    <div className='h-[50px] border-b w-full flex justify-center border-b-bg-gray pt-[3px]'>
      <ul className='flex w-full justify-between max-w-[1080px]'>
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              'w-1/3 border-l border-r border-gray-300 first:border-r-0 last:border-l-0 hover:bg-orange-100 hover:text-primary transition-all duration-300',
              step === item.label && 'bg-orange-50 text-primary'
            )}>
            <button
              onClick={() => setStep(item.label)}
              className='w-full h-full flex items-center justify-center text-[18px] cursor-pointer font-medium'>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
