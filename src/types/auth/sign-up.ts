import type { User } from '@/types';

export type SignUpRequest = Pick<User, 'password' | 'userName' | 'email'> & {
  studentNo?: string;
};

export type CheckStudentNoRequest = Pick<User, 'studentNo'>;

export type CheckEmailRequest = Pick<User, 'email'>;

export type CheckCodeRequest = {
  verificationCode: string;
};

export type SignUpResponse = {
  message: string;
};

export type UserType = 'member' | 'general';
