import apiInstance from '@/lib/axios';
import axios from 'axios';

// GET /my-page/profile
export const getMyProfile = async () => {
  const response = await apiInstance.get('/my-page/profile');
  return response.data;
};

export const getMyProfileMocking = async () => {
  const response = await axios.get('/my-page/profile');

  return response.data;
};
