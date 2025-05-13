import apiInstance from '@/lib/axios';
import axios from 'axios';

// GET /my-page/myreviews
export const getMyReviews = async () => {
  const response = await apiInstance.get('/my-page/my-reviews');
  return response.data;
};

export const getMyReviewsMocking = async () => {
  const response = await axios.get('/my-page/my-reviews');

  return response.data;
};
