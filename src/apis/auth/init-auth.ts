import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth';

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

export const getUserId = async () => {
  const { setUserNo } = useAuthStore.getState();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    setUserNo(data.user.id);
  }

  return data.user?.id;
};

export const getUrl = async () => {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl('uploads/art-2025-5.jpg');

  return data.publicUrl;
};
