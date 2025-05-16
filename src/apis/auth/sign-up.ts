import { supabase } from '@/lib/supabase';
import type {
  CheckEmailRequest,
  CheckStudentNoRequest,
  SignUpRequest,
} from '@/types/auth/sign-up';

// POST 회원가입 /user/sign-up
export const signUp = async ({
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

export const checkEmail = async ({ email }: CheckEmailRequest) => {
  const { data } = await supabase.from('users').select('*').eq('email', email);

  if (data && data.length > 0) {
    throw new Error('이미 등록된 이메일입니다.');
  } else {
    return true;
  }
};

// GET 학번 중복검사 /user/check-studentNo
export const checkStudentNo = async ({ studentNo }: CheckStudentNoRequest) => {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('studentNo', studentNo);

  if (data && data.length > 0) {
    throw new Error('이미 등록된 학번입니다.');
  } else {
    return true;
  }
};

// POST 이메일 인증 발송 /user/check-email
// export const checkEmail = async ({
//   email,
// }: CheckEmailRequest): Promise<MessageResponse> => {
//   const response = await apiInstance.post('/user/check-email', {
//     email,
//   });

//   return response.data;
// };

// POST 인증번호 확인 /user/check-code
// export const checkCode = async ({
//   verificationCode,
// }: CheckCodeRequest): Promise<MessageResponse> => {
//   const response = await apiInstance.post('/user/check-code', {
//     verificationCode,
//   });

//   return response.data;
// };
