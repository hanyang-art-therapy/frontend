import { supabase } from '@/lib/supabase';
import axios from 'axios';

// GET /my-page/myreviews
// export const getMyReviews = async () => {
//   const response = await apiInstance.get('/my-page/my-reviews');
//   return response.data;
// };

export const getMyReviewsMocking = async () => {
  const response = await axios.get('/my-page/my-reviews');

  return response.data;
};

export const getMyReviews = async (userNo: string) => {
  const response = await supabase.rpc('get_my_reviews', {
    user_no: userNo,
  });

  console.log(response);

  return response.data;
};
