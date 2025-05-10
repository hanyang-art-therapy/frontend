import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

export default function StudentNoSection({
  register,
  errors,
}: {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}) {
  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray-d'>
      <label className='t-b-16 flex items-center'>
        학번 <Required nbsp />
      </label>
      <div className='flex gap-[30px] h-[45px]'>
        <Input
          className='w-[200px] h-[45px]'
          placeholder='학번을 입력해주세요.'
          {...register('studentNo')}
        />
      </div>
      {errors.studentNo && (
        <p className='text-destructive t-r-14'>{errors.studentNo.message}</p>
      )}
    </div>
  );
}
