import apiInstance from '@/lib/axios';
import type {
  PostAdminArtRequest,
  PatchAdminArtRequest,
  AdminArtResponse,
} from '@/types/admin/arts';

export const postAdminArt = async (
  data: PostAdminArtRequest
): Promise<{ message: string }> => {
  const res = await apiInstance.post('/admin/arts', data);
  return res.data;
};

export const getAdminArts = async (): Promise<AdminArtResponse[]> => {
  const res = await apiInstance.get('/admin/arts');
  return res.data;
};

export const getAdminArtByNo = async (
  artsNo: number
): Promise<AdminArtResponse> => {
  const res = await apiInstance.get(`/admin/arts/${artsNo}`);
  return res.data;
};

export const patchAdminArt = async (
  artsNo: number,
  data: PatchAdminArtRequest
): Promise<AdminArtResponse> => {
  const res = await apiInstance.patch(`/admin/arts/${artsNo}`, data);
  return res.data;
};

export const deleteAdminArt = async (
  artsNo: number
): Promise<{ message: string }> => {
  const res = await apiInstance.delete(`/admin/arts/${artsNo}`);
  return res.data;
};
