import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

type NameFieldProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  className?: string;
};

export default function NameField({
  value,
  onChange,
  className,
}: NameFieldProps) {
  return (
    <div className='flex flex-col'>
      <label htmlFor='name' className='mb-2 t-m-16'>
        이름
      </label>
      <Input
        id='name'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-[45px] sm:w-[300px] w-full ${className || ''}`}
        placeholder='이름을 입력해주세요'
      />
    </div>
  );
}
