import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import ShowPassword from '@/components/ui/show-password';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import { useEffect, useState } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

type PwSectionProps = {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
  trigger: UseFormTrigger<SignUpFormValues>;
};

export default function PwSection({
  register,
  errors,
  watch,
  trigger,
}: PwSectionProps) {
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (password && confirmPassword) trigger('confirmPassword');
  }, [password, confirmPassword, trigger]);

  return (
    <div className='py-[20px] border-b border-bg-gray-d flex gap-[30px] flex-col md:flex-row w-full'>
      <div className='space-y-2.5'>
        <label
          aria-label='비밀번호'
          htmlFor='password'
          className='t-b-16 flex items-center'
        >
          비밀번호 <Required nbsp />
        </label>
        <div className='relative'>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            aria-label='비밀번호'
            className='w-[200px] h-[45px] t-r-16 pr-12'
            placeholder='비밀번호를 입력해주세요.'
            {...register('password')}
          />
          <ShowPassword
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        {errors.password && (
          <p className='text-destructive t-r-14'>{errors.password.message}</p>
        )}
      </div>

      <div className='space-y-2.5'>
        <label
          aria-label='비밀번호 확인'
          htmlFor='confirmPassword'
          className='t-b-16 flex items-center'
        >
          비밀번호 확인 <Required nbsp />
        </label>
        <div className='relative'>
          <Input
            id='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            aria-label='비밀번호 확인'
            className='w-[200px] h-[45px] t-r-16 pr-12'
            placeholder='비밀번호를 입력해주세요.'
            {...register('confirmPassword')}
          />
          <ShowPassword
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
        </div>

        {errors.confirmPassword && (
          <p className='text-destructive t-r-14'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <span className='mt-auto t-r-14 text-gray-6'>
        <Required /> 영문 대소문자, 숫자, 특수문자(~!@#$%^&*)를 조합하여
        입력해주세요.
      </span>
    </div>
  );
}
