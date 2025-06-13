import { useAuthStore } from '@/store/auth';
import { refresh } from '@/apis/auth/refresh';
let initAuthPromise: Promise<void> | null = null;

export const initializeAuth = (): Promise<void> => {
  const { setAccessToken, setUserNo, setRole, reset } = useAuthStore.getState();
  if (initAuthPromise) return initAuthPromise;

  initAuthPromise = (async () => {
    try {
      const { data } = await refresh();

      setAccessToken(data.accessToken);
      setUserNo(data.userNo);
      setRole(data.role);
    } catch {
      reset();
    }
  })();

  return initAuthPromise;
};
