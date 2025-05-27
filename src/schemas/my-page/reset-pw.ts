import { z } from 'zod';
import { validatePassword } from '@/lib/helper/my-page';

export const resetPwFormSchema = z
  .object({
    currentPassword: z.string().min(10, '기존 비밀번호를 입력해주세요.'),
    newPassword: z
      .string()
      .min(10, '10자 이상 입력해주세요.')
      .max(30, '30자 이하로 입력해주세요.')
      .refine((value) => validatePassword(value), {
        message: '영문, 숫자, 특수문자를 조합하여 입력해주세요.',
      }),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type ResetPwFormData = z.infer<typeof resetPwFormSchema>;
