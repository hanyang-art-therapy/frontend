import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { handleApiError } from '@/components/common/error-handler';

// import apiInstance from '@/lib/axios';
// const initAuthPromise: Promise<void> | null = null;

// export const initializeAuth = (): Promise<void> => {
//   const { setAccessToken, clearAccessToken } = useAuthStore.getState();
//   if (initAuthPromise) return initAuthPromise;

//   initAuthPromise = (async () => {
//     try {
//       const res = await apiInstance.post('/user/refresh', null, {
//         withCredentials: true,
//       });
//       const token = res.data.access_token;
//       setAccessToken(token);
//     } catch {
//       clearAccessToken();
//     }
//   })();

//   return initAuthPromise;
// };

export const initializeAuth = async () => {
  const { setAccessToken } = useAuthStore.getState();

  try {
    const response = await axios.post('/user/refresh', null, {
      withCredentials: true,
      timeout: 10000,
    });

    const token = response.data.accessToken;

    setAccessToken(token);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
