import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

export default function UserIdSection({
  register,
  errors,
}: {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}) {
  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray-d'>
      <label className='t-b-16 flex items-center'>
        아이디 <Required nbsp />
      </label>
      <div className='flex gap-[30px] h-[45px]'>
        <Input
          className='w-[200px] h-auto'
          autoComplete='username'
          placeholder='아이디를 입력해주세요.'
          {...register('userId')}
        />
      </div>

      {errors.userId && (
        <p className='text-destructive t-r-14'>{errors.userId.message}</p>
      )}
    </div>
  );
}
