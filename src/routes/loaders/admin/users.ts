import { getUsersTest } from '@/apis/admin/tester/users';
import { getUsers } from '@/apis/admin/users';
import { initializeAuth } from '@/apis/auth/init-auth';
import { useAuthStore } from '@/store/auth';

export const adminUserLoader = async () => {
  await initializeAuth();
  const { role } = useAuthStore.getState();

  if (role === 'TESTER') {
    const response = await getUsersTest({});

    return response;
  }
  const response = await getUsers();

  return response;
};
