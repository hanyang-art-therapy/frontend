import PwField from '@/components/my-page/reset-pw/pw-field';
import ResetPwDialog from '@/components/my-page/reset-pw/reset-pw-dialog';
import { Button } from '@/components/ui/button';
import { validatePassword } from '@/lib/utils';
import type { ResetPwFieldKey } from '@/types/my-page';
import { useMemo, useState } from 'react';

export default function ResetPw() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState<Record<ResetPwFieldKey, string>>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<ResetPwFieldKey, string>>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const isValid = useMemo(() => {
    return (
      !errors.currentPassword &&
      !errors.newPassword &&
      !errors.confirmPassword &&
      form.newPassword.length >= 10 &&
      form.newPassword === form.confirmPassword
    );
  }, [errors, form]);

  const handleChange = (key: ResetPwFieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateField = (key: ResetPwFieldKey) => {
    const value = form[key].trim();
    if (!value.length) return;

    let error = '';

    if (value.length < 10) error = '10자 이상 입력해주세요.';

    if (value.length > 30) error = '30자 이하로 입력해주세요.';

    if (key !== 'confirmPassword' && !validatePassword(value)) {
      error = '영문, 숫자, 특수문자를 조합하여 입력해주세요.';
    }

    if (key === 'confirmPassword' && value !== form.newPassword) {
      error = '비밀번호가 일치하지 않습니다.';
    }

    setErrors((prev) => ({ ...prev, [key]: error }));
  };

  const handleSubmit = () => {
    if (isValid) {
      setIsDialogOpen(true);
    }
  };

  return (
    <div className='min-h-screen-vh mt-[60px] md:px-0 px-5'>
      <div className='md:max-w-[1080px] mx-auto pt-[60px] '>
        <h1 className='title-b-24 mb-[40px]'>비밀번호 변경</h1>

        <div className='rounded-[5px] border border-muted bg-bg-muted shadow-lg mb-[60px]'>
          <table className='w-full border-collapse'>
            <tbody>
              <PwField
                id='current-password'
                label='기존 비밀번호'
                fieldKey='currentPassword'
                form={form}
                errors={errors}
                handleChange={handleChange}
                validateField={validateField}
              />

              <PwField
                id='new-password'
                label='새로운 비밀번호'
                fieldKey='newPassword'
                form={form}
                errors={errors}
                handleChange={handleChange}
                validateField={validateField}
                guideMessage='*10자 이상의 영문 대소문자, 숫자, 특수문자를 조합하여 사용할 수 있습니다'
              />

              <PwField
                id='confirm-password'
                label='비밀번호 확인'
                fieldKey='confirmPassword'
                form={form}
                errors={errors}
                handleChange={handleChange}
                validateField={validateField}
              />
            </tbody>
          </table>
        </div>

        <div className='flex justify-center'>
          <Button
            className='md:w-[300px] w-full mx-auto'
            disabled={!isValid}
            onClick={handleSubmit}>
            비밀번호 변경
          </Button>
        </div>
      </div>

      <ResetPwDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
}
