import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

export default function UserNameSection({
  register,
  errors,
}: {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}) {
  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray'>
      <label className='title-b-16 flex items-center'>
        이름 <Required nbsp />
      </label>
      <Input
        className='w-[200px] h-[45px]'
        placeholder='이름을 입력해주세요.'
        {...register('userName')}
      />

      {errors.userName && (
        <p className='text-destructive text-r-14'>{errors.userName.message}</p>
      )}
    </div>
  );
}
