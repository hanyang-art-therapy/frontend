import {
  EmailSection,
  PwSection,
  StudentNoSection,
  UserIdSection,
  UserNameSection,
  UserTypeSection,
} from '@/components/auth/sign-up/step-2/form/sections';
import { Button } from '@/components/ui/button';
import {
  signUpSchema,
  type SignUpFormValues,
} from '@/schemas/sign-up/sign-up-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpForm({
  setProgress,
}: {
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  const [selectedDomain, setSelectedDomain] = useState('hanyang.ac.kr');
  const [userType, setUserType] = useState('member');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log({
      userId: data.userId,
      password: data.password,
      userName: data.userName,
      email: data.emailId + '@' + data.emailDomain,
      studentNo: data.studentNo,
    });

    setProgress(3);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <UserTypeSection userType={userType} setUserType={setUserType} />
      <UserIdSection register={register} errors={errors} />
      <PwSection register={register} errors={errors} />
      <UserNameSection register={register} errors={errors} />
      <EmailSection
        register={register}
        setValue={setValue}
        watch={watch}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        errors={errors}
      />

      {userType === 'member' && (
        <StudentNoSection register={register} errors={errors} />
      )}

      <div className='flex justify-center mt-[60px]'>
        <Button
          type='submit'
          className='w-full md:w-[200px] h-[50px]'
          disabled={!isValid}>
          가입하기
        </Button>
      </div>
    </form>
  );
}
