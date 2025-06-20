import apiInstance from '@/lib/axios';
import type { ProfessorsResponse } from '@/types/admin/professors';

export const getProfessors = async (): Promise<ProfessorsResponse[]> => {
  const res = await apiInstance.get('/professors');
  return res.data;
};
