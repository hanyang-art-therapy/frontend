import apiInstance from '@/lib/axios';
import type { RefreshResponse } from '@/types/auth/sign-in';
import { AxiosResponse } from 'axios';

export const refresh = async (): Promise<AxiosResponse<RefreshResponse>> => {
  const response = await apiInstance.post('/user/refresh', null, {
    withCredentials: true,
  });

  return response;
};
