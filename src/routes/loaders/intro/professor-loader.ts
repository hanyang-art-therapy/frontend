import { getProfessors } from '@/apis/admin/professors';
import type { ProfessorsResponse } from '@/types/admin/professors';

export const introProfessorLoader = async (): Promise<ProfessorsResponse[]> => {
  const response = await getProfessors();

  return response;
};
