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
