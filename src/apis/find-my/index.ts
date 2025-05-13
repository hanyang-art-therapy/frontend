import apiInstance from '@/lib/axios';
import type { MessageResponse } from '@/types';
import type {
  FindIdRequest,
  FindPasswordRequest,
  ResetPasswordRequest,
} from '@/types/find-my';
import axios from 'axios';

// POST /user/find-id
export const findMyId = async ({
  email,
  userName,
}: FindIdRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/find-id', {
    params: { email, userName },
  });

  return response.data;
};

export const findMyIdMocking = async ({
  email,
  userName,
}: FindIdRequest): Promise<MessageResponse> => {
  const response = await axios.post('/user/find-id', {
    email,
    userName,
  });

  return response.data;
};

// POST /user/find-password
export const findMyPassword = async ({
  userId,
  email,
}: FindPasswordRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/find-password', {
    params: { userId, email },
  });

  return response.data;
};

export const findMyPasswordMocking = async ({
  userId,
  email,
}: FindPasswordRequest): Promise<MessageResponse> => {
  const response = await axios.post('/user/find-password', {
    userId,
    email,
  });

  return response.data;
};

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

export const resetPasswordMocking = async ({
  userId,
  currentPassword,
  newPassword,
}: ResetPasswordRequest): Promise<MessageResponse> => {
  const response = await axios.post('/user/reset-password', {
    userId,
    currentPassword,
    newPassword,
  });

  return response.data;
};
