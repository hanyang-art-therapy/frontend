import apiInstance from '@/lib/axios';
import type {
  ArtistResponse,
  PostArtistRequest,
  PatchArtistRequest,
} from '@/types/admin/artists';
import type { MessageResponse } from '@/types';

export const getArtists = async (): Promise<ArtistResponse[]> => {
  const res = await apiInstance.get('/admin/artists');
  return res.data;
};

export const getArtist = async (artistNo: number): Promise<ArtistResponse> => {
  const res = await apiInstance.get(`/admin/artists/${artistNo}`);
  return res.data;
};

export const patchArtist = async (
  artistNo: number,
  data: Omit<PatchArtistRequest, 'artistNo'>
): Promise<MessageResponse> => {
  const res = await apiInstance.patch(`/admin/artists/${artistNo}`, data);
  return res.data;
};

export const deleteArtist = async (
  artistNo: number
): Promise<MessageResponse> => {
  const res = await apiInstance.delete(`/admin/artists/${artistNo}`);
  return res.data;
};

export const postArtist = async (
  data: PostArtistRequest
): Promise<MessageResponse> => {
  const res = await apiInstance.post('/admin/artists', data);
  return res.data;
};
