import { cn } from '@/lib/utils';

type StepProps = {
  items: { label: string; value: string }[];
  step: string;
  onChange: (step: string) => void;
  className?: string;
};

export default function Step({ items, step, onChange, className }: StepProps) {
  const width = `${100 / items.length || 1}%`;

  return (
    <div
      className={cn(
        'h-[50px] border-b w-full flex justify-center border-b-bg-gray-d',
        className
      )}
    >
      <ul className='flex w-full justify-between md:max-w-[1260px]'>
        {items.map((item, index) => {
          return (
            <li
              key={index}
              style={{ width }}
              className={cn(
                'border-r border-gray-300 first:border-l-1 last:border-l-0 hover:bg-primary/10 hover:text-primary transition-all duration-300',
                step === item.value && 'bg-primary/10 text-primary'
              )}
            >
              <button
                onClick={() => onChange(item.value)}
                className={cn(
                  'w-full h-full flex items-center justify-center cursor-pointer',
                  step === item.value ? 't-m-18' : 't-r-18'
                )}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
