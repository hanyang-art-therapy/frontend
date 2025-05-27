import apiInstance from '@/lib/axios';
import { supabase } from '@/lib/supabase';
import type { MyReviewData } from '@/types/my-page';
import axios from 'axios';

// GET 내가 작성한 댓글 목록조회 /my-page/my-reviews
// GET 내가 작성한 댓글 목록조회 /my-page/my-reviews
export const getMyReviews = async (): Promise<MyReviewData[]> => {
  const response = await apiInstance.get('/my-page/my-reviews');

  return response.data;
};

export const getMyReviewsMocking = async () => {
  const response = await axios.get('/my-page/my-reviews');

  return response.data;
};

export const getMyReviewsSupabase = async (userNo: string) => {
  const response = await supabase.rpc('get_my_reviews', {
    user_no: userNo,
  });

  return response.data;
};
