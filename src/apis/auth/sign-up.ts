import { supabase } from '@/lib/supabase';
import type {
  CheckEmailRequest,
  CheckStudentNoRequest,
  CheckUserIdRequest,
  SignUpRequest,
} from '@/types/auth/sign-up';
import type { MessageResponse } from '@/types';
import apiInstance from '@/lib/axios';

// POST 회원가입 /user/sign-up
// POST 회원가입 /user/sign-up
export const signUp = async ({
  password,
  userName,
  email,
  studentNo,
}: SignUpRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/sign-up', {
    params: { password, userName, email, studentNo },
  });

  return response.data;
};

export const signUpSupabase = async ({
  password,
  userName,
  email,
  studentNo,
}: SignUpRequest) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요');
  }

  if (data) {
    await supabase.from('users').insert({
      userNo: data.user?.id,
      password,
      email,
      userName,
      studentNo,
    });
  }
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
