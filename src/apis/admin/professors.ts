import apiInstance from '@/lib/axios';
import type {
  ProfessorsResponse,
  PatchProfessorRequest,
  PostProfessorRequest,
} from '@/types/admin/professors';
import { MessageResponse } from '@/types';
import { supabase } from '@/lib/supabase';

export const getProfessors = async (): Promise<ProfessorsResponse[]> => {
  const res = await apiInstance.get('/admin/professors');
  return res.data;
};

export const getProfessorsTest = async (): Promise<ProfessorsResponse[]> => {
  const res = await supabase.from('professors').select('*');
  return res.data as ProfessorsResponse[];
};

export const getProfessor = async (
  professorNo: number
): Promise<ProfessorsResponse> => {
  const res = await apiInstance.get(`/admin/professors/${professorNo}`);
  return res.data;
};

export const patchProfessor = async (
  professorNo: number,
  data: Omit<PatchProfessorRequest, 'professorNo'>
): Promise<MessageResponse> => {
  const res = await apiInstance.patch(`/admin/professors/${professorNo}`, data);
  return res.data;
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

export const deleteProfessor = async (
  professorNo: number
): Promise<MessageResponse> => {
  const res = await apiInstance.delete(`/admin/professors/${professorNo}`);
  return res.data;
};

export const deleteProfessorTest = async (professorNo: number) => {
  const res = await supabase
    .from('professor')
    .delete()
    .eq('professorNo', professorNo);

  return res.data;
};

export const postProfessor = async (
  data: PostProfessorRequest
): Promise<MessageResponse> => {
  const res = await apiInstance.post('/admin/professors', data);
  return res.data;
};

export const postProfessorTest = async (data: PostProfessorRequest) => {
  await supabase.from('professors').insert(data);
};
