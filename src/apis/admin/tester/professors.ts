import { supabase } from '@/lib/supabase';
import type {
  PatchProfessorRequest,
  PostProfessorRequest,
  ProfessorsResponse,
} from '@/types/admin/professors';

export const getProfessorsTest = async (): Promise<ProfessorsResponse[]> => {
  const res = await supabase.from('professors').select('*');
  return res.data as ProfessorsResponse[];
};

export const patchProfessorTest = async (
  professorNo: number,
  data: Omit<PatchProfessorRequest, 'professorNo'>
) => {
  const res = await supabase
    .from('professor')
    .update(data)
    .eq('professorNo', professorNo);

  return res.data;
};

export const deleteProfessorTest = async (professorNo: number) => {
  const res = await supabase
    .from('professor')
    .delete()
    .eq('professorNo', professorNo);

  return res.data;
};

export const postProfessorTest = async (data: PostProfessorRequest) => {
  await supabase.from('professors').insert(data);
};
