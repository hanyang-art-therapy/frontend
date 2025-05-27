import { supabase } from '@/lib/supabase';
import type { SignInRequest, SignInResponse } from '@/types/auth/sign-in';
import apiInstance from '@/lib/axios';

// POST 로그인 /user/sign-in
// POST 로그인 /user/sign-in
export const signIn = async ({
  userId,
  password,
}: SignInRequest): Promise<SignInResponse> => {
  const response = await apiInstance.post('/user/sign-in', {
    userId,
    password,
  });

  return response.data;
};

export const signInSupabase = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
  }

  return data;
};
