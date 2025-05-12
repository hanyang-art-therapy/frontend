import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

export default function PwSection({
  register,
  errors,
}: {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}) {
  return (
    <div className='py-[20px] border-b border-bg-gray-d flex gap-[30px] flex-col md:flex-row'>
      <div className='space-y-2.5'>
        <label className='t-b-16 flex items-center'>
          비밀번호 <Required nbsp />
        </label>
        <Input
          type='password'
          className='w-[200px] h-[45px]'
          autoComplete='new-password'
          placeholder='비밀번호를 입력해주세요.'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-destructive t-r-14'>
            {errors.password.message}
          </p>
        )}
      </div>

      <div className='space-y-2.5'>
        <label className='t-b-16 flex items-center'>
          비밀번호 확인 <Required nbsp />
        </label>
        <Input
          type='password'
          className='w-[200px] h-[45px]'
          autoComplete='new-password'
          placeholder='비밀번호를 입력해주세요.'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className='text-destructive t-r-14'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
}
