import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import EmailDomainSelect from '@/components/auth/common/email-domain-select';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

type EmailSectionProps = {
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
  selectedDomain: string;
  setSelectedDomain: (value: string) => void;
  errors: FieldErrors<SignUpFormValues>;
};

export default function EmailSection({
  register,
  setValue,
  watch,
  selectedDomain,
  setSelectedDomain,
  errors,
}: EmailSectionProps) {
  const isCustomDomain = selectedDomain === 'custom';
  const watchEmailDomain = watch('emailDomain');
  const domainValue = isCustomDomain ? watchEmailDomain : selectedDomain;

  const handleEmailDomainChange = (value: string) => {
    setSelectedDomain(value);

    if (value !== 'custom') {
      setValue('emailDomain', value);
    } else {
      setValue('emailDomain', '');
    }
  };

  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray'>
      <label className='title-b-16 flex items-center'>
        이메일 <Required />
      </label>
      <div className='flex items-center gap-[30px]'>
        <div className='flex gap-2.5 h-[45px] items-center'>
          {/* 이메일 ID */}
          <Input
            {...register('emailId')}
            className='w-[200px] h-full'
            placeholder='이메일을 입력해주세요.'
          />

          {/* @ */}
          <span className='text-r-16'>@</span>

          {/* 이메일 도메인 */}
          <Input
            {...register('emailDomain')}
            className='w-[200px] h-full'
            placeholder='직접 입력'
            value={domainValue}
            onChange={(e) => setValue('emailDomain', e.target.value)}
            disabled={selectedDomain !== 'custom' && selectedDomain !== ''}
          />

          {/* 이메일 도메인 선택 */}
          <EmailDomainSelect
            value={selectedDomain}
            onValueChange={handleEmailDomainChange}
          />
        </div>

        {(errors.emailId || errors.emailDomain) && (
          <p className='text-destructive text-r-14'>
            {errors.emailId?.message || errors.emailDomain?.message}
          </p>
        )}
      </div>
    </div>
  );
}
