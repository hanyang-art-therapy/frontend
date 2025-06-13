import EmailDomainSelect from '@/components/auth/common/email-domain-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EMAIL_DOMAIN_SELECT_OPTIONS } from '@/constants/common/common';
import type { MessageResponse } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

type EmailFieldProps = {
  originalEmailId: string;
  originalEmailDomain: string;
  localEmailId: string | null;
  localEmailDomain: string | null;
  onEmailIdChange: Dispatch<SetStateAction<string | null>>;
  onEmailDomainChange: (value: string) => void;
  onSendVerificationCode: () => Promise<MessageResponse | null>;
  isVerificationSent: boolean;
  verificationCode: string | null;
  setVerificationCode: Dispatch<SetStateAction<string | null>>;
  className?: string;
};

export default function EmailField({
  originalEmailId,
  originalEmailDomain,
  localEmailId,
  localEmailDomain,
  onEmailIdChange,
  onEmailDomainChange,
  onSendVerificationCode,
  isVerificationSent,
  verificationCode,
  setVerificationCode,
  className,
}: EmailFieldProps) {
  const [isLoading, setIsLoading] = useState(false);

  const isCustomDomain = !EMAIL_DOMAIN_SELECT_OPTIONS.includes(
    localEmailDomain ?? ''
  );

  // Input에 표시될 도메인 값 계산
  const getDisplayDomainValue = () => {
    if (isCustomDomain) {
      // 직접 입력 (직접 입력 선택 시 초기 값 빈 값)
      return localEmailDomain === 'custom' ? '' : localEmailDomain ?? '';
    } else {
      // 미리 정의된 도메인 선택 시 (기본 값은 한양대 이메일)
      return localEmailDomain ?? 'hanyang.ac.kr';
    }
  };

  const handleSendVerifyCodeClick = async () => {
    if (
      originalEmailId === localEmailId &&
      originalEmailDomain === localEmailDomain
    ) {
      return toast.error('기존 이메일을 사용할 수 없습니다.');
    }

    if (!localEmailId || !localEmailDomain) {
      return toast.error('이메일을 입력해주세요.');
    }

    if (localEmailId.length > 30) {
      return toast.error('이메일은 30자 이하로 입력해주세요.');
    }

    if (localEmailDomain.length > 30) {
      return toast.error('이메일 도메인은 30자 이하로 입력해주세요.');
    }

    setIsLoading(true);
    await onSendVerificationCode();
    setIsLoading(false);
  };

  return (
    <div className={`flex flex-col space-y-10 ${className || ''}`}>
      <label htmlFor='email' className='mb-2 t-m-16'>
        변경할 이메일
      </label>

      <div className='flex gap-2 md:items-center items-start flex-col md:flex-row'>
        <Input
          id='email'
          value={localEmailId ?? ''}
          onChange={(e) => onEmailIdChange(e.target.value)}
          className='h-[45px] sm:w-[300px] w-full'
          placeholder='이메일 주소'
        />
        <span className='t-r-16 hidden md:block'>@</span>
        <Input
          className='sm:w-[300px] w-full h-[45px]'
          placeholder='직접 입력'
          value={getDisplayDomainValue()}
          onChange={(e) => onEmailDomainChange(e.target.value)}
          disabled={!isCustomDomain}
        />

        <EmailDomainSelect
          value={
            isCustomDomain ? 'custom' : localEmailDomain ?? 'hanyang.ac.kr'
          }
          onValueChange={onEmailDomainChange}
        />

        <Button
          size='sm'
          className='h-[45px] mt-auto t-r-14'
          aria-label='이메일 인증하기'
          onClick={handleSendVerifyCodeClick}
          disabled={isVerificationSent || isLoading}
        >
          {isLoading ? '발송 중...' : '인증 메일 발송'}
        </Button>
      </div>

      {isVerificationSent && (
        <div className='flex flex-col'>
          <label htmlFor='verificationCode' className='mb-2 t-m-16'>
            인증 코드
          </label>

          <Input
            id='verificationCode'
            className='w-[200px] h-[45px]'
            placeholder='인증 코드'
            value={verificationCode ?? ''}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
