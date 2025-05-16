import { signUp } from '@/apis/auth/sign-up';
import {
  EmailSection,
  PwSection,
  StudentNoSection,
  UserNameSection,
  UserTypeSection,
} from '@/components/auth/sign-up/step-2/form/sections';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import {
  signUpSchema,
  generalSignUpSchema,
  type SignUpFormValues,
  type MemberSignUpFormValues,
} from '@/schemas/sign-up/sign-up-schema';
import type { UserType } from '@/types/auth/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignUpForm({
  setProgress,
}: {
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  const [selectedDomain, setSelectedDomain] = useState('hanyang.ac.kr');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>('member');
  const [isStudentNoValid, setIsStudentNoValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(
      userType === 'member' ? signUpSchema : generalSignUpSchema
    ),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const email = data.emailId + '@' + data.emailDomain;

    setIsLoading(true);

    try {
      await signUp({
        password: data.password,
        userName: data.userName,
        email,
        studentNo:
          userType === 'member'
            ? (data as MemberSignUpFormValues).studentNo
            : undefined,
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast(errorMessage);
    }

    setProgress(3);
    reset();
    setIsLoading(false);
  };

  useEffect(() => {
    if (userType === 'general') {
      clearErrors('studentNo');
      setIsStudentNoValid(true);
      reset(
        { ...watch(), studentNo: undefined },
        { keepErrors: false, keepDirty: true, keepTouched: true }
      );
      trigger();
    }
  }, [userType, clearErrors, setIsStudentNoValid, reset, watch, trigger]);

  const isButtonDisabled =
    isLoading ||
    !isValid ||
    (userType === 'member' && !isStudentNoValid) ||
    !isEmailValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <UserTypeSection userType={userType} setUserType={setUserType} />

      <EmailSection
        register={register}
        setValue={setValue}
        watch={watch}
        setError={setError}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        errors={errors}
        setIsEmailValid={setIsEmailValid}
      />

      <PwSection register={register} errors={errors} />

      {userType === 'member' && (
        <StudentNoSection
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          setIsStudentNoValid={setIsStudentNoValid}
        />
      )}

      <UserNameSection register={register} errors={errors} />

      <div className='flex justify-center mt-[60px]'>
        <Button
          type='submit'
          className='w-full md:w-[200px] h-[50px]'
          disabled={isButtonDisabled}>
          가입하기
          {isLoading && <LoaderCircle className='w-6 h-6 ml-2 animate-spin' />}
        </Button>
      </div>
    </form>
  );
}
