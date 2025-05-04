import { z } from 'zod';

export const signUpSchema = z
  .object({
    userId: z
      .string()
      .min(1, { message: '아이디를 입력해주세요' })
      .max(15, { message: '아이디는 15자 이하이어야 합니다' }),
    password: z
      .string()
      .min(10, { message: '비밀번호는 10자 이상이어야 합니다' })
      .max(15, { message: '비밀번호는 15자 이하이어야 합니다' })
      .regex(/[a-zA-Z0-9!@#$%^&*]/, '형식에 맞게 입력해주세요'),
    confirmPassword: z
      .string()
      .min(1, { message: '비밀번호 확인을 진행해주세요' }),
    userName: z
      .string()
      .min(1, { message: '이름을 입력해주세요' })
      .max(10, { message: '이름은 10자 이하이어야 합니다' }),
    emailId: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .max(20, { message: '이메일은 20자 이하이어야 합니다' }),
    emailDomain: z
      .string()
      .min(1, { message: '이메일 도메인을 입력해주세요' })
      .max(20, { message: '이메일 도메인은 20자 이하이어야 합니다' }),
    studentNo: z
      .string()
      .min(1, { message: '학번을 입력해주세요' })
      .max(10, { message: '학번은 10자 이하이어야 합니다' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
