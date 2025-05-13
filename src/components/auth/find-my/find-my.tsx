import { findMyIdMocking, findMyPasswordMocking } from '@/apis/find-my';
import FindMyPwDialog from '@/components/auth/find-my/find-my-pw-dialog';
import EmailSection from '@/components/auth/find-my/form/email-section';
import UserInfoSection from '@/components/auth/find-my/form/user-info-section';
import { Button } from '@/components/ui/button';
import Step from '@/components/ui/step';
import { FIND_MY_STEP_ITEMS } from '@/constants/auth/find-my';
import {
  findMySchema,
  type FindMyFormValues,
} from '@/schemas/find-my/find-my-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleApiError } from '@/components/common/error-handler';
import { toast } from 'sonner';

export default function FindMy() {
  const [findId, findPw] = FIND_MY_STEP_ITEMS; // 아이디 찾기
  const [step, setStep] = useState(findId.value); // 현재 진행 단계
  const [selectedDomain, setSelectedDomain] = useState('hanyang.ac.kr'); // 이메일 도메인
  const [isDialogOpen, setIsDialogOpen] = useState(false); // 비밀번호 찾기 모달 열림 여부
  const [foundId, setFoundId] = useState<string | null>(null); // 찾은 아이디

  const isFindId = step === findId.value;

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

  const onSubmit = async (data: FindMyFormValues) => {
    const { userId, userName, emailId, emailDomain } = data;
    const email = `${emailId}@${emailDomain}`;

    if (isFindId && userName) {
      try {
        const response = await findMyIdMocking({
          email,
          userName,
        });

        setFoundId(response.message);

        setIsDialogOpen(true);
      } catch (error) {
        toast.error(handleApiError(error));
      }
    }

    if (!isFindId && userId && email) {
      try {
        await findMyPasswordMocking({
          userId,
          email,
        });

        setIsDialogOpen(true);
      } catch (error) {
        toast.error(handleApiError(error));
      }
    }

    reset();
  };

  return (
    <>
      <Step items={FIND_MY_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='md:max-w-[1260px] md:px-0 px-5 mx-auto pt-[60px] space-y-[30px] md:min-h-[calc(100vh-394px)]'>
        <h1 className='t-b-24'>{isFindId ? findId.label : findPw.label}</h1>
        <p className='t-b-18'>회원님의 정보를 각 항목에 맞게 입력해주세요.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='border-t border-bg-gray-d mt-[30px]'>
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
            findId={findId.value}
          />

          <div className='flex justify-center mt-[60px]'>
            <Button
              type='submit'
              className='w-[200px] h-[50px]'
              disabled={!isValid}>
              {isFindId ? '아이디 찾기' : '비밀번호 찾기'}
            </Button>
          </div>
        </form>

        <FindMyPwDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          foundId={foundId}
        />
      </div>
    </>
  );
}
