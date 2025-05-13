import apiInstance from '@/lib/axios';
import axios from 'axios';

// POST /user/sign-in
export const signIn = async (userId: string, password: string) => {
  const response = await apiInstance.post('/user/signin', { userId, password });

  return response.data;
};

export const signInMocking = async (userId: string, password: string) => {
  const response = await axios.post('/user/sign-in', { userId, password });

  return response.data;
};
