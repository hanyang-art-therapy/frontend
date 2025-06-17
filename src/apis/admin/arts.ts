import apiInstance from '@/lib/axios';
import type {
  InfiniteKeywordSearchRequest,
  InfiniteScrollResponse,
  MessageResponse,
} from '@/types';
import type {
  AdminArtResponse,
  AdminArtsResponse,
  PatchAdminArtRequest,
  PostAdminArtRequest,
} from '@/types/admin/arts';

export const getAdminArts = async ({
  filter,
  keyword,
  lastId,
  size,
}: InfiniteKeywordSearchRequest): Promise<
  InfiniteScrollResponse<AdminArtsResponse>
> => {
  if (keyword === '') {
    keyword = undefined;
    filter = undefined;
  }

  const res = await apiInstance.get('/admin/arts', {
    params: {
      filter,
      keyword,
      lastId,
      size,
    },
  });

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
): Promise<MessageResponse> => {
  const res = await apiInstance.patch(`/admin/arts/${artsNo}`, data);
  return res.data;
};

export const deleteAdminArt = async (
  artsNo: number
): Promise<MessageResponse> => {
  const res = await apiInstance.delete(`/admin/arts/${artsNo}`);

  return res.data;
};

export const postAdminArt = async (
  data: PostAdminArtRequest
): Promise<MessageResponse> => {
  const res = await apiInstance.post('/admin/arts', data);
  return res.data;
};
