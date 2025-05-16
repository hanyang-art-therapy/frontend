import type { User } from '@/types';

export type FindIdRequest = Pick<User, 'email' | 'userName'>;

export type FindPasswordRequest = Pick<User, 'userId' | 'email'>;

export type ResetPasswordRequest = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};

export type MyProfileResponse = Pick<
  User,
  'userId' | 'email' | 'userName' | 'studentNo' | 'role'
>;
