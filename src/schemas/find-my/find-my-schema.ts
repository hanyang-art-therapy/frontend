import { z } from 'zod';

// 계정 찾기 스키마 정의
export const findMySchema = z
  .object({
    userName: z
      .string()
      .min(1, { message: '이름을 입력해주세요' })
      .max(10, { message: '이름은 10자 이하이어야 합니다' })
      .nullable(),
    userId: z
      .string()
      .min(1, { message: '아이디를 입력해주세요' })
      .max(15, { message: '아이디는 15자 이하이어야 합니다' })
      .nullable(),
    emailId: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .max(20, { message: '이메일은 20자 이하이어야 합니다' }),
    emailDomain: z.string().min(1, { message: '이메일 도메인을 입력해주세요' }),
  })
  .refine((data) => {
    // 이름 또는 아이디 중 하나만 입력해야 함
    return (
      (data.userName && data.userName.length > 0) ||
      (data.userId && data.userId.length > 0)
    );
  });

export type FindMyFormValues = z.infer<typeof findMySchema>;
