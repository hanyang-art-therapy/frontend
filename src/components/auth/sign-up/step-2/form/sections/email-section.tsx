'use client';

import EmailDomainSelect from '@/components/auth/common/email-domain-select';
import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import { checkEmail } from '@/apis/auth/sign-up';
import { handleApiError } from '@/components/common/error-handler';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type { Dispatch, SetStateAction } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  UseFormSetError,
} from 'react-hook-form';

type EmailSectionProps = {
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
  setError: UseFormSetError<SignUpFormValues>;
  setIsEmailValid: Dispatch<SetStateAction<boolean>>;
  selectedDomain: string;
  setSelectedDomain: Dispatch<SetStateAction<string>>;
  errors: FieldErrors<SignUpFormValues>;
};

export default function EmailSection({
  register,
  setValue,
  watch,
  setError,
  setIsEmailValid,
  selectedDomain,
  setSelectedDomain,
  errors,
}: EmailSectionProps) {
  const isCustomDomain = selectedDomain === 'custom';
  const watchEmailDomain = watch('emailDomain');
  const domainValue = isCustomDomain ? watchEmailDomain : selectedDomain;

  const handleEmailDomainChange = (value: string) => {
    setSelectedDomain(value);
    setValue('emailDomain', value === 'custom' ? '' : value);
  };

  const handleEmailBlur = async () => {
    const emailId = watch('emailId');
    const emailDomain = watch('emailDomain');

    if (emailId && emailDomain) {
      try {
        await checkEmail({ email: `${emailId}@${emailDomain}` });
        setIsEmailValid(true);
      } catch (error) {
        const errorMessage = handleApiError(error);

        setError('emailId', {
          type: 'manual',
          message: errorMessage,
        });

        setIsEmailValid(false);
      }
    }
  };

  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray-d'>
      <label className='t-b-16 flex items-center'>
        이메일 <Required />
      </label>

      <div className='flex flex-col gap-[10px]'>
        <div className='flex gap-2.5 h-auto md:h-[45px] md:items-center items-start flex-col md:flex-row'>
          {/* 이메일 ID */}
          <Input
            {...register('emailId')}
            className='w-[200px] h-[45px]'
            placeholder='이메일을 입력해주세요.'
            onBlur={handleEmailBlur}
          />

          {/* @ */}
          <span className='t-r-16 hidden md:block'>@</span>

          {/* 이메일 도메인 */}
          <Input
            {...register('emailDomain')}
            className='w-[200px] h-[45px]'
            placeholder='직접 입력'
            autoComplete='email'
            value={domainValue}
            onChange={(e) => setValue('emailDomain', e.target.value)}
            disabled={selectedDomain !== 'custom' && selectedDomain !== ''}
            onBlur={handleEmailBlur}
          />

          {/* 이메일 도메인 선택 */}
          <EmailDomainSelect
            value={selectedDomain}
            onValueChange={handleEmailDomainChange}
          />
        </div>

        {(errors.emailId || errors.emailDomain) && (
          <p className='text-destructive t-r-14'>
            {errors.emailId?.message || errors.emailDomain?.message}
          </p>
        )}
      </div>
    </div>
  );
}
