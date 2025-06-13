import apiInstance from '@/lib/axios';

// DELETE /user/sign-out
export const signOut = async () => {
  await apiInstance.post('/user/sign-out');
};
