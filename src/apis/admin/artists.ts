import apiInstance from '@/lib/axios';
import type {
  ArtistResponse,
  PostArtistRequest,
  PatchArtistRequest,
} from '@/types/admin/artists';

export const getArtists = async (): Promise<ArtistResponse[]> => {
  const res = await apiInstance.get('/admin/artists');
  return res.data;
};

export const getArtist = async (artistNo: number): Promise<ArtistResponse> => {
  const res = await apiInstance.get(`/admin/artists/${artistNo}`);
  return res.data;
};

export const patchArtist = async (
  data: PatchArtistRequest
): Promise<{ message: string }> => {
  const res = await apiInstance.patch(`/admin/artists/${data.artistNo}`, data);
  return res.data;
};

export const deleteArtist = async (
  artistNo: number
): Promise<{ message: string }> => {
  const res = await apiInstance.delete(`/admin/artists/${artistNo}`);
  return res.data;
};

export const postArtist = async (
  data: PostArtistRequest
): Promise<{ message: string }> => {
  const res = await apiInstance.post('/admin/artists', data);
  return res.data;
};
