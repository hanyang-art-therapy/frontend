import type { Dispatch, SetStateAction } from 'react';

type StepProps = {
  items: string[];
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
};

export default function Step({ items, step, setStep }: StepProps) {
  return (
    <div className='h-[50px] border-b w-full flex justify-center border-b-[#ddd]'>
      <ul className='flex w-full justify-between max-w-[1080px]'>
        {items.map((item, index) => (
          <li
            key={index}
            className={`w-1/3 border-l border-r border-gray-300 first:border-r-0 last:border-l-0 hover:bg-orange-100 hover:text-primary transition-all duration-300 ${
              step === item ? 'bg-orange-100 text-primary' : ''
            }`}>
            <button
              onClick={() => setStep(item)}
              className='w-full h-full flex items-center justify-center cursor-pointer'>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
