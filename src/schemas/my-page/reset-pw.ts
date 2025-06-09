import { z } from 'zod';

export const resetPwFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(10, { message: '비밀번호는 10자 이상이어야 합니다' })
      .max(100, { message: '비밀번호는 100자 이하이어야 합니다' })
      .regex(/[A-Z]/, '대문자를 1개 이상 포함해야 합니다')
      .regex(/[0-9]/, '숫자를 1개 이상 포함해야 합니다')
      .regex(/[!@#$%^&*~]/, '특수문자를 1개 이상 포함해야 합니다')
      .regex(
        /^[a-zA-Z0-9!@#$%^&*~]+$/,
        '허용되지 않은 문자가 포함되어 있습니다'
      ),
    newPassword: z
      .string()
      .min(10, '10자 이상 입력해주세요.')
      .max(30, '100자 이하로 입력해주세요.')
      .regex(/[A-Z]/, '대문자를 1개 이상 포함해야 합니다')
      .regex(/[0-9]/, '숫자를 1개 이상 포함해야 합니다')
      .regex(/[!@#$%^&*~]/, '특수문자를 1개 이상 포함해야 합니다')
      .regex(
        /^[a-zA-Z0-9!@#$%^&*~]+$/,
        '허용되지 않은 문자가 포함되어 있습니다'
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type ResetPwFormData = z.infer<typeof resetPwFormSchema>;
