import apiInstance from '@/lib/axios';
import { MessageResponse } from '@/types';
import type {
  PatchProfessorRequest,
  PostProfessorRequest,
  ProfessorsResponse,
} from '@/types/admin/professors';

export const getProfessors = async (): Promise<ProfessorsResponse[]> => {
  const res = await apiInstance.get('/admin/professors');
  return res.data;
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

export const deleteProfessor = async (
  professorNo: number
): Promise<MessageResponse> => {
  const res = await apiInstance.delete(`/admin/professors/${professorNo}`);
  return res.data;
};

export const postProfessor = async (
  data: PostProfessorRequest
): Promise<MessageResponse> => {
  const res = await apiInstance.post('/admin/professors', data);
  return res.data;
};
