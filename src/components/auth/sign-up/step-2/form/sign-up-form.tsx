import { signUp } from '@/apis/auth/sign-up';
import {
  EmailSection,
  UserIdSection,
  PwSection,
  StudentNoSection,
  UserNameSection,
  UserTypeSection,
} from '@/components/auth/sign-up/step-2/form/sections';
import AppearContainer from '@/components/auth/sign-up/step-2/form/ui/appear-container';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import { getValidationStates } from '@/lib/helper/sign-up';
import {
  generalSignUpSchema,
  signUpSchema,
  type MemberSignUpFormValues,
  type SignUpFormValues,
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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);

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
        userId: data.userId,
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
      reset({ ...watch(), studentNo: undefined });
    }
  }, [userType, clearErrors, setIsStudentNoValid, reset, watch]);

  const isButtonDisabled =
    isLoading ||
    !isValid ||
    (userType === 'member' && !isStudentNoValid) ||
    !isEmailValid ||
    !isUserIdValid;

  const { emailValid, passwordValid, confirmPasswordValid, studentNoValid } =
    getValidationStates({
      watch,
      errors,
      isUserIdValid,
      isEmailValid,
      isStudentNoValid,
      userType,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserTypeSection userType={userType} setUserType={setUserType} />

      <UserIdSection
        register={register}
        watch={watch}
        errors={errors}
        setError={setError}
        setIsUserIdValid={setIsUserIdValid}
      />

      <AppearContainer show={isUserIdValid}>
        <EmailSection
          isEmailValid={isEmailValid}
          selectedDomain={selectedDomain}
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          setError={setError}
          setIsEmailValid={setIsEmailValid}
          setSelectedDomain={setSelectedDomain}
        />
      </AppearContainer>

      <AppearContainer show={emailValid}>
        <PwSection
          register={register}
          errors={errors}
          watch={watch}
          trigger={trigger}
        />
      </AppearContainer>

      <AppearContainer
        show={
          emailValid &&
          passwordValid &&
          confirmPasswordValid &&
          userType === 'member'
        }
      >
        <StudentNoSection
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          setIsStudentNoValid={setIsStudentNoValid}
        />
      </AppearContainer>

      <AppearContainer show={studentNoValid}>
        <UserNameSection register={register} errors={errors} />
      </AppearContainer>

      <div className='flex justify-center mt-[60px]'>
        <Button
          type='submit'
          aria-label='가입하기'
          className='w-full md:w-[200px] h-[50px]'
          disabled={isButtonDisabled}
        >
          가입하기
          {isLoading && <LoaderCircle className='w-6 h-6 ml-2 animate-spin' />}
        </Button>
      </div>
    </form>
  );
}
