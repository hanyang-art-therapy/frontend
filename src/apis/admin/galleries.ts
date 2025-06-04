import apiInstance from '@/lib/axios';
import type {
  GalleriesResponse,
  PostGalleriesRequest,
  PatchGalleriesRequest,
} from '@/types/admin/galleries';

export const getGalleries = async (): Promise<GalleriesResponse[]> => {
  const res = await apiInstance.get('/admin/galleries');
  return res.data;
};

export const getGallery = async (
  galleriesNo: number
): Promise<GalleriesResponse> => {
  const res = await apiInstance.get(`/admin/galleries/${galleriesNo}`);
  return res.data;
};

export const postGallery = async (
  data: PostGalleriesRequest
): Promise<{ message: string }> => {
  const res = await apiInstance.post('/admin/galleries', data);
  return res.data;
};

export const patchGallery = async (
  galleriesNo: number,
  data: Omit<PatchGalleriesRequest, 'galleriesNo'>
): Promise<GalleriesResponse> => {
  const res = await apiInstance.patch(`/admin/galleries/${galleriesNo}`, data);
  return res.data;
};

export const deleteGallery = async (
  galleriesNo: number
): Promise<{ message: string }> => {
  const res = await apiInstance.delete(`/admin/galleries/${galleriesNo}`);
  return res.data;
};
