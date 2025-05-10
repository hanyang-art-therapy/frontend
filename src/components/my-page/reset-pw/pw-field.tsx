import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ResetPwFieldKey } from '@/types/my-page';

type PwFieldProps = {
  id: string;
  label: string;
  fieldKey: ResetPwFieldKey;
  form: Record<ResetPwFieldKey, string>;
  errors: Record<ResetPwFieldKey, string>;
  handleChange: (fieldKey: ResetPwFieldKey, value: string) => void;
  validateField: (fieldKey: ResetPwFieldKey) => void;
  guideMessage?: string;
};

export default function PwField({
  id,
  label,
  fieldKey,
  form,
  handleChange,
  errors,
  validateField,
  guideMessage,
}: PwFieldProps) {
  const showMessage =
    errors[fieldKey] ||
    (form[fieldKey] === '' && guideMessage ? guideMessage : '');

  return (
    <tr className='border-b-[1px] relative border-bg-gray last:border-b-0 md:h-[45px] h-[35px]'>
      <td className='title-b-16 title-b-14 rounded-[5px] text-center md:w-[160px] w-[100px] border-r-[1px] border-bg-gray bg-bg-muted'>
        {label}
      </td>

      <td className='text-gray text-r-14 md:text-r-16 px-4 bg-white rounded-[5px]'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between py-2 relative'>
          <Input
            id={id}
            type='password'
            value={form[fieldKey]}
            onChange={(e) => handleChange(fieldKey, e.target.value)}
            onBlur={() => validateField(fieldKey)}
            className={cn(
              'max-w-[440px]',
              errors[fieldKey] && 'border-destructive'
            )}
            required
          />

          <span className='text-[12px] md:text-r-14 text-destructive'>
            {showMessage}
          </span>
        </div>
      </td>
    </tr>
  );
}
