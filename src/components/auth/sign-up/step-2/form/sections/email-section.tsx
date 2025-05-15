import { checkCode, checkEmail } from '@/apis/auth/sign-up';
import EmailDomainSelect from '@/components/auth/common/email-domain-select';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import { formatTimeLeft } from '@/lib/utils';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type { Dispatch, FocusEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { toast } from 'sonner';

type EmailSectionProps = {
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
  selectedDomain: string;
  setSelectedDomain: (value: string) => void;
  isEmailValid: boolean;
  setIsEmailValid: Dispatch<SetStateAction<boolean>>;
  setError: UseFormSetError<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
};

export default function EmailSection({
  register,
  setValue,
  watch,
  selectedDomain,
  setSelectedDomain,
  isEmailValid,
  setIsEmailValid,
  setError,
  errors,
}: EmailSectionProps) {
  const [isEmailConfirming, setIsEmailConfirming] = useState(false);
  const [isResendingAble, setIsResendingAble] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const isCustomDomain = selectedDomain === 'custom';
  const watchEmailId = watch('emailId');
  const watchEmailDomain = watch('emailDomain');
  const domainValue = isCustomDomain ? watchEmailDomain : selectedDomain;

  useEffect(() => {
    if (!isEmailConfirming || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isEmailConfirming, timeLeft]);

  const handleEmailDomainChange = (value: string) => {
    setSelectedDomain(value);

    if (value !== 'custom') {
      setValue('emailDomain', value);
    } else {
      setValue('emailDomain', '');
    }
  };

  const handleEmailConfirm = async () => {
    if (domainValue && domainValue.trim()) {
      try {
        await checkEmail({ email: `${watchEmailId}@${domainValue}` });
        toast.success('인증번호가 전송되었습니다. 메일함을 확인해주세요');
        setIsEmailConfirming(true);
        setTimeLeft(300);
      } catch (error) {
        toast.error(handleApiError(error));
      }
    }
  };

  const handleEmailVerifyBlur = async (event: FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();

    if (!inputValue) return;

    try {
      const response = await checkCode({ verificationCode: inputValue });

      setIsEmailValid(true);
      setIsEmailConfirming(false);

      toast.success(response.message);

      setError('emailId', { message: '' });
    } catch (error) {
      setError('emailId', { message: '인증번호가 올바르지 않습니다.' });

      toast.error(handleApiError(error));
    }
  };

  const handleEmailVerifyResend = async () => {
    if (domainValue && domainValue.trim()) {
      try {
        await checkEmail({ email: `${watchEmailId}@${domainValue}` });
        toast.success('인증번호가 전송되었습니다. 메일함을 확인해주세요');
      } catch (error) {
        toast.error(handleApiError(error));
      } finally {
        setIsResendingAble(false);
        setTimeLeft(300);
      }
    }
  };

  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray-d '>
      <label className='t-b-16 flex items-center'>
        이메일 <Required />
      </label>

      <div className='flex flex-col gap-[10px]'>
        <div className='flex flex-col gap-2.5'>
          <div className='flex gap-2.5 h-auto md:h-[45px] md:items-center items-start flex-col md:flex-row'>
            {/* 이메일 ID */}
            <Input
              {...register('emailId')}
              className='w-[200px] h-[45px]'
              placeholder='이메일을 입력해주세요.'
              disabled={isEmailValid}
            />

            {/* @ */}
            <span className='t-r-16 hidden md:block'>@</span>

            {/* 이메일 도메인 */}

            <Input
              {...register('emailDomain')}
              className='w-[200px] h-[45px]'
              placeholder='직접 입력'
              value={domainValue}
              onChange={(e) => setValue('emailDomain', e.target.value)}
              disabled={selectedDomain !== 'custom' && selectedDomain !== ''}
            />

            <div className='flex  gap-2.5'>
              {/* 이메일 도메인 선택 */}
              <EmailDomainSelect
                value={selectedDomain}
                onValueChange={handleEmailDomainChange}
                disabled={isEmailValid}
              />

              <Button
                type='button'
                size='sm'
                className='h-[45px]'
                onClick={handleEmailConfirm}
                disabled={
                  !watchEmailId?.trim() || isEmailConfirming || isEmailValid
                }>
                인증 받기
              </Button>
            </div>
          </div>

          {isEmailConfirming && (
            <div className='flex  gap-2.5 flex-col'>
              <div className='flex items-center gap-2.5'>
                <Input
                  disabled={!isEmailConfirming}
                  onBlur={handleEmailVerifyBlur}
                  placeholder='인증번호를 입력해주세요'
                  className='w-[200px] h-[45px]'
                />

                <Button
                  size='sm'
                  type='button'
                  className='h-[45px]'
                  disabled={!isResendingAble}
                  onClick={handleEmailVerifyResend}>
                  재전송
                </Button>
              </div>

              <div className='t-r-16 pl-2'>
                {timeLeft > 0 ? (
                  <span className='text-primary t-r-14'>
                    {formatTimeLeft(timeLeft)}
                  </span>
                ) : (
                  <Button type='button' size='sm' className='h-[45px]'>
                    인증번호 재전송
                  </Button>
                )}
              </div>
            </div>
          )}
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
