import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
  return (
    <tr className='border-b-[1px] relative border-bg-gray-d last:border-b-0 md:h-[45px] h-[35px]'>
      <td className='t-b-16 text-center md:w-[250px] w-[100px] border-r-[1px] border-bg-gray-d bg-bg-muted'>
        {label}
      </td>

      <td className='text-gray t-r-14 md:text-r-16 px-4 rounded-[5px] bg-white'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between py-2 relative'>
          <Input
            id={id}
            type='password'
            {...register(fieldKey)}
            className={cn('max-w-[400px]', error && 'border-destructive')}
            autoComplete={label}
            required
          />

          <span className='text-[12px] md:t-r-14 text-destructive'>
            {error}
          </span>
        </div>
      </td>
    </tr>
  );
}
