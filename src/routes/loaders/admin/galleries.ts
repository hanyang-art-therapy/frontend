import { getGalleries } from '@/apis/admin/galleries';
import { getGalleriesTest } from '@/apis/admin/tester/galleries';
import { initializeAuth } from '@/apis/auth/init-auth';
import { useAuthStore } from '@/store/auth';

export const adminGalleriesLoader = async () => {
  await initializeAuth();
  const { role } = useAuthStore.getState();

  if (role === 'TESTER') {
    const response = await getGalleriesTest();

    return response;
  }

  const response = await getGalleries();

  return response;
};
