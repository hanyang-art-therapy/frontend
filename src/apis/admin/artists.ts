import apiInstance from '@/lib/axios';
import type {
  InfiniteKeywordSearchRequest,
  InfiniteScrollResponse,
  MessageResponse,
} from '@/types';
import type {
  ArtistResponse,
  PatchArtistRequest,
  PostArtistRequest,
} from '@/types/admin/artists';

export const getArtists = async ({
  filter,
  keyword,
  lastId,
}: InfiniteKeywordSearchRequest): Promise<
  InfiniteScrollResponse<ArtistResponse>
> => {
  if (lastId && filter && keyword) {
    const res = await apiInstance.get(
      `/admin/artists?lastId=${lastId}&filter=${filter}&keyword=${keyword}`
    );

    return res.data;
  }

  if (filter && keyword) {
    const res = await apiInstance.get(
      `/admin/artists?filter=${filter}&keyword=${keyword}`
    );
    return res.data;
  }

  if (lastId) {
    const res = await apiInstance.get(`/admin/artists?lastId=${lastId}`);
    return res.data;
  }

  const res = await apiInstance.get(`/admin/artists`);

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
