import apiInstance from '@/lib/axios';
import type { UserResponse, PatchUserRequest } from '@/types/admin/users';

export const getUsers = async (): Promise<UserResponse[]> => {
  const res = await apiInstance.get('/admin/users');
  return res.data;
};

export const getUser = async (userNo: number): Promise<UserResponse> => {
  const res = await apiInstance.get(`/admin/users/${userNo}`);
  return res.data;
};

export const patchUser = async ({
  userNo,
  userName,
  email,
  studentNo,
}: PatchUserRequest): Promise<UserResponse> => {
  const res = await apiInstance.patch(`/admin/users/${userNo}`, {
    userName,
    email,
    studentNo,
  });
  return res.data;
};
