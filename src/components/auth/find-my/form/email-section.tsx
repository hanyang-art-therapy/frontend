import EmailDomainSelect from '@/components/auth/common/email-domain-select';
import { Input } from '@/components/ui/input';
import type { FindMyFormValues } from '@/schemas/find-my/find-my-schema';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

type EmailSectionProps = {
  register: UseFormRegister<FindMyFormValues>;
  setValue: UseFormSetValue<FindMyFormValues>;
  watch: UseFormWatch<FindMyFormValues>;
  selectedDomain: string;
  setSelectedDomain: (value: string) => void;
  errors: FieldErrors<FindMyFormValues>;
};

export default function EmailSection({
  register,
  setValue,
  watch,
  selectedDomain,
  setSelectedDomain,
  errors,
}: EmailSectionProps) {
  const watchEmailDomain = watch('emailDomain');
  const isCustomDomain = selectedDomain === 'custom';
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
    <div className='py-[20px] flex flex-col gap-[10px] border-b border-bg-gray'>
      <label className='title-b-16'>이메일</label>
      <div className='flex gap-2.5 h-[45px] items-center'>
        <Input
          {...register('emailId')}
          className='w-[200px] h-full'
          placeholder='이메일을 입력해주세요'
        />

        <span className='text-r-16'>@</span>

        <Input
          {...register('emailDomain')}
          className='w-[200px] h-full'
          placeholder='직접 입력'
          value={domainValue}
          onChange={(e) => setValue('emailDomain', e.target.value)}
          disabled={selectedDomain !== 'custom' && selectedDomain !== ''}
        />

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
  );
}
