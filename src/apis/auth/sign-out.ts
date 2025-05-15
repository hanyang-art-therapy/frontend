import apiInstance from '@/lib/axios';

// DELETE /user/sign-out
export const signOut = async () => {
  const response = await apiInstance.delete('/user/sign-out');

  return response.data;
};
