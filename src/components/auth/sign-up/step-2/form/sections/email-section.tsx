import { checkCode, checkEmail } from '@/apis/auth/sign-up';
import EmailDomainSelect from '@/components/auth/common/email-domain-select';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type { Dispatch, SetStateAction, MouseEvent } from 'react';
import { useState, useEffect } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { toast } from 'sonner';
import { cn, formatTimeLeft } from '@/lib/utils';
import { Check } from 'lucide-react';

type EmailSectionProps = {
  isEmailValid: boolean;
  selectedDomain: string;
  errors: FieldErrors<SignUpFormValues>;
  register: UseFormRegister<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  setError: UseFormSetError<SignUpFormValues>;
  setIsEmailValid: Dispatch<SetStateAction<boolean>>;
  setSelectedDomain: Dispatch<SetStateAction<string>>;
};

export default function EmailSection({
  isEmailValid,
  selectedDomain,
  errors,
  register,
  watch,
  setValue,
  setError,
  setIsEmailValid,
  setSelectedDomain,
}: EmailSectionProps) {
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [isVerificationCodeValid, setIsVerifcationCodeValid] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const isCustomDomain = selectedDomain === 'custom';
  const watchEmailDomain = watch('emailDomain');
  const domainValue = isCustomDomain ? watchEmailDomain : selectedDomain;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (showVerification && isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) setIsTimerActive(false);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showVerification, isTimerActive, timer]);

  const handleEmailDomainChange = (value: string) => {
    setSelectedDomain(value);
    setValue('emailDomain', value === 'custom' ? '' : value);
  };

  // 인증 메일 발송 핸들러
  const handleSendVerifyCodeClick = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const emailId = watch('emailId');
    const emailDomain = watch('emailDomain');

    if (emailId && emailDomain) {
      try {
        const response = await checkEmail({
          email: `${emailId}@${emailDomain}`,
        });

        setShowVerification(true);
        setTimer(180);
        setIsTimerActive(true);
        toast(response.message);
      } catch (error) {
        const errorMessage = handleApiError(error);

        setError('emailId', {
          type: 'manual',
          message: errorMessage,
        });
      }
    }
  };

  // 인증 버튼 클릭 핸들러
  const handleVerificationButtonClick = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (verificationCode) {
      try {
        const response = await checkCode({ verificationCode });

        setIsVerifcationCodeValid(true);
        setIsTimerActive(false);
        setIsEmailValid(true);

        toast.success(response.message);
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      }
    }
  };

  // 재전송 버튼 클릭 핸들러
  const handleResendVerifyCodeClick = async (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      const emailId = watch('emailId');
      const emailDomain = watch('emailDomain');

      await checkEmail({
        email: `${emailId}@${emailDomain}`,
      });

      setVerificationCode('');
      setTimer(180);
      setIsTimerActive(true);
      setIsResend(true);

      toast('재전송되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
      setIsResend(false);
    }
  };

  return (
    <div className='py-[20px] space-y-10 border-b border-bg-gray-d'>
      <div className='space-y-2.5'>
        <label
          aria-label='이메일'
          htmlFor='email'
          className='t-b-16 flex items-center'>
          이메일 <Required />
        </label>

        <div className='flex flex-col gap-[10px]'>
          <div className='flex gap-2.5 md:gap-2.5 h-auto md:h-[45px] md:items-center items-start'>
            <div className='flex flex-col md:flex-row gap-2.5'>
              <div className='flex items-center gap-2.5'>
                {/* 이메일 ID */}
                <Input
                  id='email'
                  aria-label='이메일 ID'
                  {...register('emailId')}
                  className='w-[200px] h-[45px] t-r-16'
                  placeholder='이메일을 입력해주세요.'
                  autoComplete='email'
                  disabled={showVerification}
                />

                {/* @ */}
                <span className='t-r-16 md:inline hidden'>@</span>
              </div>

              {/* 이메일 도메인 */}
              <Input
                aria-label='이메일 도메인'
                {...register('emailDomain')}
                className='w-[200px] h-[45px] t-r-16'
                placeholder='직접 입력'
                autoComplete='email'
                value={domainValue}
                onChange={(e) => setValue('emailDomain', e.target.value)}
                disabled={selectedDomain !== 'custom' && selectedDomain !== ''}
              />

              {/* 이메일 도메인 선택 */}
              <EmailDomainSelect
                value={selectedDomain}
                onValueChange={handleEmailDomainChange}
                disabled={showVerification}
              />
            </div>

            <Button
              size='sm'
              className='h-[45px] mt-auto t-r-14'
              aria-label='이메일 인증하기'
              onClick={handleSendVerifyCodeClick}
              disabled={showVerification}>
              인증 메일 발송
            </Button>
          </div>

          {(errors.emailId || errors.emailDomain) && (
            <p className='text-destructive t-r-14'>
              {errors.emailId?.message || errors.emailDomain?.message}
            </p>
          )}
        </div>
      </div>

      {showVerification && (
        <div className='flex flex-col gap-2.5'>
          <label
            aria-label='인증번호 입력'
            htmlFor='verificationCode'
            className='t-b-16 flex items-center'>
            인증번호 입력 <Required />
          </label>

          <div className='flex gap-2.5 h-auto md:h-[45px] md:items-center items-start flex-col md:flex-row'>
            <div className='min-w-full flex flex-row gap-2.5'>
              <div className='relative'>
                <Input
                  id='verificationCode'
                  aria-label='이메일 인증번호'
                  value={verificationCode ?? ''}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className='w-full md:w-[300px] max-w-[200px] md:max-w-full h-[45px] pr-14 md:pr-14 t-r-16'
                  placeholder='인증번호 입력'
                  disabled={!isTimerActive}
                />

                <div
                  className={cn(
                    'absolute w-fit md:left-64  right-3 top-1/2 -translate-y-1/2 ',
                    isEmailValid && 'md:left-66'
                  )}>
                  {isEmailValid ? (
                    <Check className='text-success' />
                  ) : (
                    <span
                      className='t-r-14 text-center text-primary'
                      aria-label='남은 시간'>
                      {formatTimeLeft(timer)}
                    </span>
                  )}
                </div>
              </div>

              <div className='flex gap-2.5'>
                <Button
                  type='button'
                  size='sm'
                  aria-label='인증하기'
                  className='h-[45px] px-4 t-r-14'
                  onClick={handleVerificationButtonClick}
                  disabled={!isTimerActive}>
                  인증
                </Button>

                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  aria-label='메일 재전송'
                  className='h-[45px] px-4 t-r-14 text-black'
                  onClick={handleResendVerifyCodeClick}
                  disabled={isResend || isVerificationCodeValid}>
                  재전송
                </Button>
              </div>
            </div>
          </div>

          {!isTimerActive && !isVerificationCodeValid && (
            <p className='text-destructive t-r-14'>
              인증 시간이 만료되었습니다. 다시 시도해주세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
