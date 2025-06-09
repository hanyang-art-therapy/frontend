import { User } from '@/types/index';

// [GET] 조회 및 상세조회
export type UserResponse = User;

// [PATCH] 수정 요청
export type PatchUserRequest = Pick<
  User,
  | 'userNo'
  | 'userId'
  | 'userName'
  | 'email'
  | 'studentNo'
  | 'role'
  | 'userStatus'
>;
