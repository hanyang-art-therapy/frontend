import { supabase } from '@/lib/supabase';
import { MessageResponse } from '@/types';
import type {
  PatchProfessorRequest,
  PostProfessorRequest,
  ProfessorsResponse,
} from '@/types/admin/professors';
import { toast } from 'sonner';

export const getProfessorsTest = async (): Promise<ProfessorsResponse[]> => {
  const { data, error } = await supabase.from('professors').select(
    `
    professorNo,
    professorName,
    position,
    major,
    email,
    tel,
    files:files(url)
   `
  );

  if (error) {
    toast.error('교수 목록 조회에 실패했습니다');
  }

  return data as unknown as ProfessorsResponse[];
};

export const patchProfessorTest = async (
  professorNo: number,
  data: Omit<PatchProfessorRequest, 'professorNo'>
) => {
  const { error } = await supabase
    .from('professors')
    .update(data)
    .eq('professorNo', professorNo);

  if (error) {
    toast.error('교수 정보 수정이 실패했습니다');
  }
  return { message: '교수 정보가 수정 되었습니다' };
};

export const deleteProfessorTest = async (professorNo: number) => {
  const { error } = await supabase
    .from('professors')
    .delete()
    .eq('professorNo', professorNo);

  if (error) {
    toast.error('교수 삭제에 실패했습니다');
  }
  return { message: '교수진 정보 삭제가 완료되었습니다' };
};

export const postProfessorTest = async (
  data: PostProfessorRequest
): Promise<MessageResponse> => {
  await supabase.from('professors').insert(data);

  return { message: '교수진 등록이 완료되었습니다' };
};
