import { postResetPassword } from '@/apis/my-page/profile';
import { handleApiError } from '@/components/common/error-handler';
import PwField from '@/components/my-page/reset-pw/pw-field';
import ResetPwDialog from '@/components/my-page/reset-pw/reset-pw-dialog';
import { Button } from '@/components/ui/button';
import {
  resetPwFormSchema,
  type ResetPwFormData,
} from '@/schemas/my-page/reset-pw';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function ResetPw() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const userId = searchParams.get('userId');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPwFormData>({
    resolver: zodResolver(resetPwFormSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ResetPwFormData) => {
    if (isValid) {
      try {
        setIsLoading(true);

        await postResetPassword({
          userId: userId || '',
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });

        setIsDialogOpen(true);
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section>
      <div className='space-y-[30px]'>
        <span className='block space-y-2 t-r-14 pt-15'>
          <h1 className='t-b-24'>비밀번호 변경</h1>
          <p>
            *10자 이상의 영문 대소문자, 숫자, 특수문자를 조합하여 사용할 수
            있습니다
          </p>
        </span>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='rounded-[5px] overflow-hidden'
        >
          <div className='rounded-[5px] box-shadow-style overflow-hidden border border-bg-gray-d bg-bg-gray-fa'>
            <table className='w-full'>
              <tbody>
                <PwField
                  id='current-password'
                  label='기존 비밀번호'
                  fieldKey='currentPassword'
                  register={register}
                  error={errors.currentPassword?.message}
                />

                <PwField
                  id='new-password'
                  label='새로운 비밀번호'
                  fieldKey='newPassword'
                  register={register}
                  error={errors.newPassword?.message}
                />

                <PwField
                  id='confirm-password'
                  label='비밀번호 확인'
                  fieldKey='confirmPassword'
                  register={register}
                  error={errors.confirmPassword?.message}
                />
              </tbody>
            </table>
          </div>

          <div className='flex justify-center mt-15'>
            <Button
              type='submit'
              className='md:w-[300px] w-full mx-auto'
              disabled={!isValid || isLoading}
            >
              비밀번호 변경
              {isLoading && <LoaderCircle className='w-4 h-4 animate-spin' />}
            </Button>
          </div>
        </form>
      </div>

      <ResetPwDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </section>
  );
}
