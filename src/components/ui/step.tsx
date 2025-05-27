import { cn } from '@/lib/utils';

type StepProps = {
  items: { label: string; value: string }[];
  step: string;
  onChange: (step: string) => void;
};

export default function Step({ items, step, onChange }: StepProps) {
  const width = `${100 / items.length || 1}%`;

  return (
    <div className='w-full h-[50px] flex justify-center'>
      <ul className='w-full md:max-w-[1260px] h-[50px] flex justify-between bg-bg-gray-fa'>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              style={{ width }}
              className={cn(
                'hover:bg-orange-100 hover:text-primary transition-all duration-300 bg-bg-gray-fa text-gray-9',
                step === item.value && 'bg-white text-black'
              )}>
              <button
                onClick={() => onChange(item.value)}
                className={cn(
                  'w-full h-full flex items-center justify-center cursor-pointer',
                  step === item.value ? 't-m-18' : 't-r-18'
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
