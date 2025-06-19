import apiInstance from '@/lib/axios';
import { supabase } from '@/lib/supabase';
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

export const getArtistsTest = async ({
  filter,
  keyword,
}: InfiniteKeywordSearchRequest) => {
  if (filter && keyword) {
    const res = await supabase
      .from('artists')
      .select('artists_no, artists_name, student_no, cohort')
      .ilike(keyword, filter)
      .single()
      .overrideTypes<InfiniteScrollResponse<ArtistResponse>>();
    return res.data;
  }

  const res = await supabase.from('artists').select('*');

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

export const patchArtistTest = async (
  artistNo: number,
  data: Omit<PatchArtistRequest, 'artistNo'>
) => {
  const res = await supabase
    .from('artists')
    .update({
      artist_name: data.artistName,
      student_no: data.studentNo,
      cohort: data.cohort,
    })
    .eq('artist_no', artistNo);
  return res.data;
};

export const deleteArtist = async (
  artistNo: number
): Promise<MessageResponse> => {
  const res = await apiInstance.delete(`/admin/artists/${artistNo}`);
  return res.data;
};

export const deleteArtistTest = async (artistNo: number) => {
  await supabase.from('artists').delete().eq('artist_no', artistNo);
};

export const postArtist = async (
  data: PostArtistRequest
): Promise<MessageResponse> => {
  const res = await apiInstance.post('/admin/artists', data);
  return res.data;
};

export const postArtistTest = async (data: PostArtistRequest) => {
  const res = await supabase.from('artists').insert({
    artist_name: data.artistName,
    student_no: data.studentNo,
    cohort: data.cohort,
  });
  return res.data;
};
