import apiInstance from '@/lib/axios';

// POST /user/sign-in
export const signIn = async (userId: string, password: string) => {
  const response = await apiInstance.post('/user/sign-in', {
    userId,
    password,
  });

  return response.data;
};
