import { supabase } from '@/lib/supabase';
import {
  GalleriesResponse,
  PatchGalleryRequest,
  PostGalleryRequest,
} from '@/types/admin/galleries';
import { toast } from 'sonner';

export const getGalleriesTest = async (): Promise<GalleriesResponse[]> => {
  const { data, error } = await supabase.from('galleries').select('*');

  if (error) {
    toast.error('전시회 목록 조회에 실패했습니다');
  }

  return data as GalleriesResponse[];
};

export const patchGalleryTest = async (
  galleriesNo: number,
  data: Omit<PatchGalleryRequest, 'galleriesNo'>
) => {
  const { error } = await supabase
    .from('galleries')
    .update(data)
    .eq('galleriesNo', galleriesNo);

  if (error) {
    toast.error('전시회 정보 수정이 실패했습니다');
  }
  return { message: '전시회 정보가 수정 되었습니다' };
};

export const deleteGalleryTest = async (galleriesNo: number) => {
  const { error } = await supabase
    .from('galleries')
    .delete()
    .eq('galleriesNo', galleriesNo);

  if (error) {
    toast.error('전시회 삭제에 실패했습니다');
  }
  return { message: '전시회 정보 삭제가 완료되었습니다' };
};

export const postGalleryTest = async (data: PostGalleryRequest) => {
  await supabase.from('galleries').insert(data);
  return { message: '전시회 등록이 완료되었습니다' };
};
