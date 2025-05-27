import { checkStudentNo } from '@/apis/auth/sign-up';
import { handleApiError } from '@/components/common/error-handler';
import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import type {
  MemberSignUpFormValues,
  SignUpFormValues,
} from '@/schemas/sign-up/sign-up-schema';
import type { Dispatch, SetStateAction, FocusEvent } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormWatch,
} from 'react-hook-form';

type StudentNoSectionProps = {
  register: UseFormRegister<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  setError: UseFormSetError<SignUpFormValues>;
  setIsStudentNoValid: Dispatch<SetStateAction<boolean>>;
};

export default function StudentNoSection({
  register,
  watch,
  errors,
  setError,
  setIsStudentNoValid,
}: StudentNoSectionProps) {
  const { onBlur, ...rest } = register('studentNo');

  const watchStudentNo = watch('studentNo');

  const handleBlur = async (event: FocusEvent<HTMLInputElement>) => {
    if (!watchStudentNo.trim()) return;

    onBlur(event);

    try {
      await checkStudentNo({
        studentNo: watchStudentNo,
      });

      setIsStudentNoValid(true);
    } catch (error) {
      const errorMessage = handleApiError(error);

      setError('studentNo', {
        type: 'manual',
        message: errorMessage,
      });

      setIsStudentNoValid(false);
    }
  };

  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray-d w-full'>
      <label
        aria-label='학번'
        htmlFor='studentNo'
        className='t-b-16 flex items-center'>
        학번 <Required nbsp />
      </label>
      <div className='flex gap-[30px] h-[45px]'>
        <Input
          id='studentNo'
          type='number'
          aria-label='학번'
          onBlur={handleBlur}
          pattern='[0-9]*'
          className='w-[200px] h-[45px] t-r-16'
          placeholder='학번을 입력해주세요.'
          {...rest}
        />
      </div>
      {(errors as FieldErrors<MemberSignUpFormValues>).studentNo && (
        <p className='text-destructive t-r-14'>
          {(errors as FieldErrors<MemberSignUpFormValues>).studentNo?.message}
        </p>
      )}
    </div>
  );
}
