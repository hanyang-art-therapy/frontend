import apiInstance from '@/lib/axios';
import type { MessageResponse } from '@/types';
import type {
  CheckEmailRequest,
  CheckStudentNoRequest,
  CheckUserIdRequest,
  SignUpRequest,
} from '@/types/auth/sign-up';

// POST 회원가입 /user/sign-up
// POST 회원가입 /user/sign-up
export const signUp = async ({
  userId,
  password,
  userName,
  email,
  studentNo,
}: SignUpRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/sign-up', {
    userId,
    password,
    userName,
    email,
    studentNo,
  });

  return response.data;
};

// GET 아이디 중복검사 /user/check-id
// GET 아이디 중복검사 /user/check-id
export const checkId = async ({
  userId,
}: CheckUserIdRequest): Promise<MessageResponse> => {
  const response = await apiInstance.get('/user/check-id', {
    params: { userId },
  });

  return response.data;
};

// POST 이메일 중복검사 /user/check-email
// POST 이메일 중복검사 /user/check-email
export const checkEmail = async ({
  email,
}: CheckEmailRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/check-email', {
    email,
  });

  return response.data;
};

// GET 학번 중복검사 /user/check-studentNo
// GET 학번 중복검사 /user/check-studentNo
export const checkStudentNo = async ({ studentNo }: CheckStudentNoRequest) => {
  const { data } = await apiInstance.get('/user/check-studentNo', {
    params: { studentNo },
  });

  return data;
};

// POST 인증번호 확인 /user/check-code
// POST 인증번호 확인 /user/check-code
export const checkCode = async ({
  verificationCode,
}: {
  verificationCode: string;
}): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/check-code', {
    verificationCode,
  });

  return response.data;
};
