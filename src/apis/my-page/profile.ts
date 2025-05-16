// import apiInstance from '@/lib/axios';
import { supabase } from '@/lib/supabase';
import type { MyProfileData } from '@/types/my-page';
import axios from 'axios';

// GET /my-page/profile
// export const getMyProfile = async () => {
//   const response = await apiInstance.get('/my-page/profile');

//   return response.data;
// };

export const getMyProfileMocking = async () => {
  const response = await axios.get('/my-page/profile');

  return response.data;
};

export const getMyProfile = async (userNo: string): Promise<MyProfileData> => {
  const { data, error } = await supabase.rpc('get_my_profile', {
    user_no: userNo,
  });

  if (error) {
    throw new Error('유저 정보가 존재하지 않습니다.');
  }

  return data ?? {};
};
