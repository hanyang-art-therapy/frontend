import apiInstance from '@/lib/axios';
import axios from 'axios';

// DELETE /user/sign-out
export const signOut = async () => {
  const response = await apiInstance.delete('/user/sign-out');

  return response.data;
};

export const signOutMocking = async () => {
  const response = await axios.delete('/user/sign-out');

  return response.data;
};
