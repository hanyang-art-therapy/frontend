import { Input } from '@/components/ui/input';
import type { FindMyFormValues } from '@/schemas/find-my/find-my-schema';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

type UserInfoSectionProps = {
  register: UseFormRegister<FindMyFormValues>;
  errors: FieldErrors<FindMyFormValues>;
  step: string;
  findId: string;
};

export default function UserInfoSection({
  register,
  errors,
  step,
  findId,
}: UserInfoSectionProps) {
  const isIdFind = step === findId; // 아이디 찾기면 true, 비밀번호 찾기면 false
  const fieldName = isIdFind ? 'userName' : 'userId'; // 아이디 찾기면 userName, 비밀번호 찾기면 userId
  const label = isIdFind ? '이름' : '아이디'; // 아이디 찾기면 이름, 비밀번호 찾기면 아이디

  return (
    <div className='py-[20px] flex flex-col gap-[10px] border-b border-bg-gray-d'>
      <label htmlFor={fieldName} className='t-b-16'>
        {label}
      </label>
      <Input
        id={fieldName}
        className='w-[300px] h-[45px]'
        placeholder={`${label + (isIdFind ? '을' : '를')} 입력해주세요`}
        {...register(fieldName as 'userName' | 'userId')}
      />
      {isIdFind
        ? errors.userName && (
            <p className='text-destructive t-r-14'>
              {errors.userName.message}
            </p>
          )
        : errors.userId && (
            <p className='text-destructive t-r-14'>
              {errors.userId.message}
            </p>
          )}
    </div>
  );
}
