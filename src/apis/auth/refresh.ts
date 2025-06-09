import apiInstance from '@/lib/axios';

export const refresh = async () => {
  const response = await apiInstance.post('/user/refresh', null, {
    withCredentials: true,
  });

  return response;
};
