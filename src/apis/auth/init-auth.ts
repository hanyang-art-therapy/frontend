import { useAuthStore } from '@/store/auth';
import { refresh } from '@/apis/auth/refresh';
let initAuthPromise: Promise<void> | null = null;

export const initializeAuth = (): Promise<void> => {
  const { setAccessToken, reset } = useAuthStore.getState();
  if (initAuthPromise) return initAuthPromise;

  initAuthPromise = (async () => {
    try {
      const res = await refresh();

      const token = res.data.accessToken;
      setAccessToken(token);
    } catch {
      reset();
    }
  })();

  return initAuthPromise;
};
