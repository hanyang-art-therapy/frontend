import { User } from '@/types';

export type SignInRequest = Pick<User, 'userId' | 'password'>;

export type SignInResponse = {
  accessToken: string;
  userNo: string;
  role: 'USER' | 'ADMIN' | 'ARTIST' | 'TESTER';
};
