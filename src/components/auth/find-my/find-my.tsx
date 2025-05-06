import FindMyPwDialog from '@/components/auth/find-my/find-my-pw-dialog';
import EmailSection from '@/components/auth/find-my/form/email-section';
import UserInfoSection from '@/components/auth/find-my/form/user-info-section';
import { Button } from '@/components/ui/button';
import Step from '@/components/ui/step';
import { FIND_MY_STEP_ITEMS } from '@/constants/find-my';
import {
  findMySchema,
  type FindMyFormValues,
} from '@/schemas/find-my/find-my-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function FindMy() {
  const findId = FIND_MY_STEP_ITEMS[0]; // 아이디 찾기

  const [step, setStep] = useState(findId); // 현재 진행 단계
  const [selectedDomain, setSelectedDomain] = useState('hanyang.ac.kr'); // 이메일 도메인
  const [isPwDialogOpen, setIsPwDialogOpen] = useState(false); // 비밀번호 찾기 모달 열림 여부

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FindMyFormValues>({
    resolver: zodResolver(findMySchema),
    mode: 'onChange',
    defaultValues: {
      userName: null,
      userId: null,
      emailId: '',
      emailDomain: 'hanyang.ac.kr',
    },
  });

  // TODO: API 호출 로직 추가
  const onSubmit = (data: FindMyFormValues) => {
    const email = `${data.emailId}@${data.emailDomain}`;

    if (step === findId) {
      // 아이디 찾기 API 호출
      console.log({ userName: data.userName, email });
    } else {
      // 비밀번호 찾기 API 호출
      console.log({ userId: data.userId, email });
      setIsPwDialogOpen(true);
    }

    reset();
  };

  return (
    <>
      <Step items={FIND_MY_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='w-[1080px] mx-auto mt-[60px] space-y-[30px]'>
        <h1 className='title-b-24'>{step}</h1>
        <p className='text-b-18'>
          회원님의 정보를 각 항목에 맞게 입력해주세요.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='border-t border-bg-gray mt-[30px]'>
          <EmailSection
            register={register}
            setValue={setValue}
            watch={watch}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            errors={errors}
          />

          <UserInfoSection
            register={register}
            errors={errors}
            step={step}
            findId={findId}
          />

          <div className='flex justify-center mt-[60px]'>
            <Button
              type='submit'
              className='w-[200px] h-[50px]'
              disabled={!isValid}>
              {step}
            </Button>
          </div>
        </form>

        <FindMyPwDialog
          isPwDialogOpen={isPwDialogOpen}
          setIsPwDialogOpen={setIsPwDialogOpen}
        />
      </div>
    </>
  );
}
