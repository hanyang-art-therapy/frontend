import { initializeAuth } from '@/apis/auth/init-auth';

export const rootLoader = async () => {
  await initializeAuth();

  return null;
};
