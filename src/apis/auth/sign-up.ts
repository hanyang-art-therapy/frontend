import axios from 'axios';
import apiInstance from '@/lib/axios';
import type {
  CheckIdRequest,
  CheckStudentNoRequest,
  SignUpRequest,
  CheckCodeRequest,
  CheckEmailRequest,
} from '@/types/auth/sign-up';
import { handleApiError } from '@/components/common/error-handler';

// POST /user/sign-up
export const signUp = async ({
  userId,
  password,
  userName,
  email,
  studentNo,
}: SignUpRequest) => {
  const response = await apiInstance.post('/user/sign-up', {
    userId,
    password,
    userName,
    email,
    studentNo,
  });

  // 회원가입 요청 후 이메일 인증을 하지 않고 다시 회원가입을 요청한 경우 (409 Confilct)
  if (response.status === 409) {
    alert(handleApiError(response.data.message));
  }
};

export const signUpMocking = async ({
  userId,
  password,
  userName,
  email,
  studentNo,
}: SignUpRequest) => {
  const response = await axios.post('/user/sign-up', {
    userId,
    password,
    userName,
    email,
    studentNo,
  });

  if (response.status === 409) {
    throw new Error(handleApiError(response.data.message));
  }
};

// GET /user/check-id
export const checkId = async ({ userId }: CheckIdRequest) => {
  const response = await apiInstance.get('/user/check-id', {
    params: { userId },
  });

  return response.data;
};

export const checkIdMocking = async ({ userId }: CheckIdRequest) => {
  const response = await axios.get('/user/check-id', {
    params: { userId },
  });

  return response.data;
};

// GET /user/check-studentNo
export const checkStudentNo = async ({ studentNo }: CheckStudentNoRequest) => {
  const response = await apiInstance.get('/user/check-studentNo', {
    params: { studentNo },
  });

  return response.data;
};

export const checkStudentNoMocking = async ({
  studentNo,
}: CheckStudentNoRequest) => {
  const response = await axios.get('/user/check-studentNo', {
    params: { studentNo },
  });

  return response.data;
};

// POST /user/check-email
export const checkEmail = async ({ email }: CheckEmailRequest) => {
  const response = await apiInstance.post('/user/check-email', {
    email,
  });

  return response.data;
};

export const checkEmailMocking = async ({ email }: CheckEmailRequest) => {
  const response = await axios.post('/user/check-email', {
    email,
  });

  return response.data;
};

// POST /user/check-code
export const checkCode = async ({ verificationCode }: CheckCodeRequest) => {
  const response = await apiInstance.post('/user/check-code', {
    verificationCode,
  });

  return response.data;
};

export const checkCodeMocking = async ({
  verificationCode,
}: CheckCodeRequest) => {
  const response = await axios.post('/user/check-code', {
    verificationCode,
  });

  return response.data;
};
