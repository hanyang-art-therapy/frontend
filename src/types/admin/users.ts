import { User } from '@/types/index';

// [GET] 조회 및 상세조회
export type UserResponse = Pick<
  User,
  'userNo' | 'userId' | 'userName' | 'email' | 'studentNo' | 'userStatus'
> & {
  role: 'USER' | 'ARTIST' | 'ADMIN';
  signinTimestamp: string | null;
  signoutTimestamp: string | null;
  bannedTimestamp: string | null;
  cause: string | null;
};

// [PATCH] 수정 요청
export type PatchUserRequest = Pick<
  UserResponse,
  | 'userNo'
  | 'userId'
  | 'userName'
  | 'email'
  | 'studentNo'
  | 'role'
  | 'userStatus'
>;
