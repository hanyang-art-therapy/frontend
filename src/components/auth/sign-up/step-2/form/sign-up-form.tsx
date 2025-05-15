import { signUp } from '@/apis/auth/sign-up';
import {
  EmailSection,
  PwSection,
  StudentNoSection,
  UserIdSection,
  UserNameSection,
  UserTypeSection,
} from '@/components/auth/sign-up/step-2/form/sections';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import {
  signUpSchema,
  type SignUpFormValues,
} from '@/schemas/sign-up/sign-up-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignUpForm({
  setProgress,
}: {
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  const [selectedDomain, setSelectedDomain] = useState('hanyang.ac.kr');
  const [userType, setUserType] = useState('member');
  const [isUserIdValid, setIsUserIdValid] = useState(true);
  const [isStudentNoValid, setIsStudentNoValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const email = data.emailId + '@' + data.emailDomain;

    try {
      await signUp({
        userId: data.userId,
        password: data.password,
        userName: data.userName,
        email,
        studentNo: data.studentNo,
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast(errorMessage);
    }

    setProgress(3);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <UserTypeSection userType={userType} setUserType={setUserType} />

      <UserIdSection
        register={register}
        watch={watch}
        errors={errors}
        setError={setError}
        setIsUserIdValid={setIsUserIdValid}
      />

      <PwSection register={register} errors={errors} />

      <UserNameSection register={register} errors={errors} />

      <EmailSection
        register={register}
        setValue={setValue}
        watch={watch}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        isEmailValid={isEmailValid}
        setIsEmailValid={setIsEmailValid}
        setError={setError}
        errors={errors}
      />

      {userType === 'member' && (
        <StudentNoSection
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          setIsStudentNoValid={setIsStudentNoValid}
        />
      )}

      <div className='flex justify-center mt-[60px]'>
        <Button
          type='submit'
          className='w-full md:w-[200px] h-[50px]'
          disabled={
            !isValid || !isUserIdValid || !isStudentNoValid || !isEmailValid
          }>
          가입하기
        </Button>
      </div>
    </form>
  );
}
