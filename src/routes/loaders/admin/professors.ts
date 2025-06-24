import { getProfessors } from '@/apis/admin/professors';
import { getProfessorsTest } from '@/apis/admin/tester/professors';
import { initializeAuth } from '@/apis/auth/init-auth';
import { useAuthStore } from '@/store/auth';

export const adminProfessorsLoader = async () => {
  await initializeAuth();
  const { role } = useAuthStore.getState();

  if (role === 'TESTER') {
    const response = await getProfessorsTest();

    return response;
  }

  const response = await getProfessors();

  return response;
};
