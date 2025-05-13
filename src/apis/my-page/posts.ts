import apiInstance from '@/lib/axios';
import axios from 'axios';

// GET /my-page/myPosts
export const getMyPosts = async () => {
  const response = await apiInstance.get('/my-page/my-posts');
  return response.data;
};

export const getMyPostsMocking = async () => {
  const response = await axios.get('/my-page/my-posts');

  return response.data;
};
