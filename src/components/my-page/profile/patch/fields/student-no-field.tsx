import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';

type StudentNoFieldProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  className?: string;
};

export default function StudentNoField({
  value,
  onChange,
  className,
}: StudentNoFieldProps) {
  return (
    <div className='flex flex-col'>
      <label htmlFor='studentNo' className='mb-2 t-m-16'>
        학번
      </label>
      <Input
        id='studentNo'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`sm:w-[300px] w-full h-[45px] ${className || ''}`}
        placeholder='학번을 입력해주세요'
      />
    </div>
  );
}
