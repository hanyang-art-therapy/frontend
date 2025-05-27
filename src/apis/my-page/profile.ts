import apiInstance from '@/lib/axios';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types';
import type { MessageResponse } from '@/types';
import type { MyProfileData } from '@/types/my-page';

// GET 내 정보 조회 /my-page/profile
// GET 내 정보 조회 /my-page/profile
export const getMyProfile = async (): Promise<MyProfileData> => {
  const response = await apiInstance.get('/my-page/profile');

  return response.data;
};

export const getMyProfileSupabase = async (
  userNo: string
): Promise<Pick<User, 'userName' | 'email' | 'studentNo'>> => {
  const { data, error } = await supabase.rpc('get_my_profile', {
    user_no: userNo,
  });

  if (error) {
    throw new Error('유저 정보가 존재하지 않습니다.');
  }

  return data ?? {};
};

// PATCH 회원 탈퇴 /my-page/withdraw
// PATCH 회원 탈퇴 /my-page/withdraw
export const withdraw = async (): Promise<MessageResponse> => {
  const response = await apiInstance.patch('/my-page/withdraw');

  return response.data;
};
