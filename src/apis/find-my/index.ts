import apiInstance from '@/lib/axios';
import type { MessageResponse } from '@/types';
import type {
  FindIdRequest,
  FindPasswordRequest,
  ResetPasswordRequest,
} from '@/types/find-my';

// POST 아이디 찾기 /user/find-id
// POST 아이디 찾기 /user/find-id
export const findMyId = async ({
  email,
  userName,
}: FindIdRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/find-id', {
    email,
    userName,
  });

  return response.data;
};

// POST 비밀번호 찾기 /user/find-password
// POST 비밀번호 찾기 /user/find-password
export const findMyPassword = async ({
  userId,
  email,
}: FindPasswordRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/find-password', {
    userId,
    email,
  });

  return response.data;
};

// POST 비밀번호 초기화 /user/reset-password
// POST 비밀번호 초기화 /user/reset-password
export const resetPassword = async ({
  userId,
  currentPassword,
  newPassword,
}: ResetPasswordRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/reset-password', {
    params: { userId, currentPassword, newPassword },
  });

  return response.data;
};
