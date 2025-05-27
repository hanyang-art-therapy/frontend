import { z } from 'zod';

const baseSchema = z.object({
  password: z
    .string()
    .min(10, { message: '비밀번호는 10자 이상이어야 합니다' })
    .max(100, { message: '비밀번호는 100자 이하이어야 합니다' })
    .regex(/[A-Z]/, '대문자를 1개 이상 포함해야 합니다')
    .regex(/[0-9]/, '숫자를 1개 이상 포함해야 합니다')
    .regex(/[!@#$%^&*~]/, '특수문자를 1개 이상 포함해야 합니다')
    .regex(/^[a-zA-Z0-9!@#$%^&*~]+$/, '허용되지 않은 문자가 포함되어 있습니다'),
  confirmPassword: z
    .string()
    .min(1, { message: '비밀번호 확인을 진행해주세요' })
    .max(100, { message: '비밀번호는 100자 이하이어야 합니다' }),
  userName: z
    .string()
    .min(1, { message: '이름을 입력해주세요' })
    .max(20, { message: '이름은 20자 이하이어야 합니다' }),
  emailId: z
    .string()
    .min(1, { message: '이메일을 입력해주세요' })
    .max(100, { message: '이메일은 100자 이하이어야 합니다' }),
  emailDomain: z
    .string()
    .min(1, { message: '이메일 도메인을 입력해주세요' })
    .max(100, { message: '이메일 도메인은 100자 이하이어야 합니다' }),
});

export const signUpSchema = baseSchema
  .extend({
    studentNo: z
      .string()
      .min(1, { message: '학번을 입력해주세요' })
      .length(10, { message: '학번은 정확히 10자여야 합니다' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export const generalSignUpSchema = baseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  }
);

export type BaseSignUpFormValues = z.infer<typeof baseSchema>;
export type MemberSignUpFormValues = z.infer<typeof signUpSchema>;
export type GeneralSignUpFormValues = z.infer<typeof generalSignUpSchema>;
export type SignUpFormValues = MemberSignUpFormValues | GeneralSignUpFormValues;
