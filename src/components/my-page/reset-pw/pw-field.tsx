import { Input } from '@/components/ui/input';
import ShowPassword from '@/components/ui/show-password';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

type RestPwFieldRegister = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type PwFieldProps = {
  id: string;
  label: string;
  fieldKey: 'currentPassword' | 'newPassword' | 'confirmPassword';
  register: UseFormRegister<RestPwFieldRegister>;
  error?: string;
  guideMessage?: string;
};

export default function PwField({
  id,
  label,
  fieldKey,
  register,
  error,
}: PwFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <tr className='border-b-[1px] relative border-bg-gray-d last:border-b-0'>
      <td className='t-b-14 text-center md:w-[250px] w-24 border-r-[1px] border-bg-gray-d bg-bg-muted'>
        {label}
      </td>

      <td className='t-r-16 px-2 sm:px-4 rounded-[5px] bg-white'>
        <div className='flex flex-col gap-1 justify-between py-2'>
          <div className='relative w-fit'>
            <Input
              id={id}
              type={showPassword ? 'text' : 'password'}
              {...register(fieldKey)}
              className={cn('sm:w-[30vw] w-fit', error && 'border-destructive')}
              autoComplete={label}
              required
            />

            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>

          <span
            className={cn(
              't-r-12 text-destructive hidden',
              error && 'block mr-auto'
            )}
          >
            {error}
          </span>
        </div>
      </td>
    </tr>
  );
}
