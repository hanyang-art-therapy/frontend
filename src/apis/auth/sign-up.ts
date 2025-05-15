import apiInstance from '@/lib/axios';
import type { MessageResponse } from '@/types';
import type {
  CheckCodeRequest,
  CheckEmailRequest,
  CheckIdRequest,
  CheckStudentNoRequest,
  SignUpRequest,
} from '@/types/auth/sign-up';

// POST 회원가입 /user/sign-up
export const signUp = async ({
  userId,
  password,
  userName,
  email,
  studentNo,
}: SignUpRequest) => {
  await apiInstance.post('/user/sign-up', {
    userId,
    password,
    userName,
    email,
    studentNo,
  });
};

// GET 아이디 중복검사 /user/check-id
export const checkId = async ({ userId }: CheckIdRequest) => {
  const response = await apiInstance.get('/user/check-id', {
    params: { userId },
  });

  return response.data;
};

// GET 학번 중복검사 /user/check-studentNo
export const checkStudentNo = async ({ studentNo }: CheckStudentNoRequest) => {
  const response = await apiInstance.get('/user/check-studentNo', {
    params: { studentNo },
  });

  return response.data;
};

// POST 이메일 인증 발송 /user/check-email
export const checkEmail = async ({
  email,
}: CheckEmailRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/check-email', {
    email,
  });

  return response.data;
};

// POST 인증번호 확인 /user/check-code
export const checkCode = async ({
  verificationCode,
}: CheckCodeRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/check-code', {
    verificationCode,
  });

  return response.data;
};
