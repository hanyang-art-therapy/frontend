import apiInstance from '@/lib/axios';
import type { MessageResponse } from '@/types';
import type {
  MyProfileData,
  PatchMyProfileRequest,
  PostEmailVerificationRequest,
  PostResetPasswordRequest,
} from '@/types/my-page';

// GET 내 정보 조회 /my-page/profile
// GET 내 정보 조회 /my-page/profile
export const getMyProfile = async (): Promise<MyProfileData> => {
  const response = await apiInstance.get('/my-page/profile');

  return response.data;
};

// PATCH 내 정보 수정 /my-page/profile
// PATCH 내 정보 수정 /my-page/profile
export const patchMyProfile = async ({
  userName,
  email,
  studentNo,
  verificationCode,
}: PatchMyProfileRequest): Promise<MyProfileData> => {
  const response = await apiInstance.patch('/my-page/profile', {
    userName,
    email,
    studentNo,
    verificationCode,
  });

  return response.data;
};

// PATCH 회원 탈퇴 /my-page/withdraw
// PATCH 회원 탈퇴 /my-page/withdraw
export const withdraw = async (): Promise<MessageResponse> => {
  const response = await apiInstance.patch('/my-page/withdraw');

  return response.data;
};

// POST 이메일 인증 /my-page/email-verification
// POST 이메일 인증 /my-page/email-verification
export const postEmailVerification = async ({
  email,
}: PostEmailVerificationRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/my-page/email-verification', {
    email,
  });

  return response.data;
};

// POST 비밀번호 변경 /user/reset-password
// POST 비밀번호 변경 /user/reset-password
export const postResetPassword = async ({
  userId,
  currentPassword,
  newPassword,
}: PostResetPasswordRequest): Promise<MessageResponse> => {
  const response = await apiInstance.post('/user/reset-password', {
    userId,
    currentPassword,
    newPassword,
  });

  return response.data;
};
