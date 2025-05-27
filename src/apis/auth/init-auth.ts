import { useAuthStore } from '@/store/auth';

import apiInstance from '@/lib/axios';
let initAuthPromise: Promise<void> | null = null;

export const initializeAuth = (): Promise<void> => {
  const { setAccessToken, reset } = useAuthStore.getState();
  if (initAuthPromise) return initAuthPromise;

  initAuthPromise = (async () => {
    try {
      const res = await apiInstance.post('/user/refresh', null, {
        withCredentials: true,
      });

      const token = res.data.access_token;
      setAccessToken(token);
    } catch {
      reset();
    }
  })();

  return initAuthPromise;
};
