import { supabase } from '@/lib/supabase';
import type {
  InfiniteKeywordSearchRequest,
  InfiniteScrollResponse,
} from '@/types';
import type {
  ArtistResponse,
  PatchArtistRequest,
  PostArtistRequest,
} from '@/types/admin/artists';
import { toast } from 'sonner';

export const getArtistsTest = async ({
  filter,
  keyword,
}: InfiniteKeywordSearchRequest): Promise<
  InfiniteScrollResponse<ArtistResponse>
> => {
  if (filter && keyword) {
    const { data, error } = await supabase
      .from('artists')
      .select('artistNo, artistName, studentNo, cohort')
      .ilike(filter, `%${keyword}%`);

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      return {
        content: data,
        lastId: 0,
        hasNext: false,
      };
    }

    return {
      content: [],
      lastId: 0,
      hasNext: false,
    };
  }

  const { data, error } = await supabase
    .from('artists')
    .select('artistNo, artistName, studentNo, cohort');

  if (error) {
    toast.error(error.message);
  }

  if (data) {
    return {
      content: data,
      lastId: 0,
      hasNext: false,
    };
  }

  return {
    content: [],
    lastId: 0,
    hasNext: false,
  };
};

export const getArtistTest = async (
  artistNo: number
): Promise<ArtistResponse> => {
  const { data, error } = await supabase
    .from('artists')
    .select('artistNo, artistName, studentNo, cohort')
    .eq('artistNo', artistNo)
    .single();

  if (error) {
    toast.error(error.message);
  }

  return data as ArtistResponse;
};

export const patchArtistTest = async (
  artistNo: number,
  data: Omit<PatchArtistRequest, 'artistNo'>
) => {
  await supabase
    .from('artists')
    .update({
      artistName: data.artistName,
      studentNo: data.studentNo,
      cohort: data.cohort,
    })
    .eq('artistNo', artistNo);

  return {
    message: '작가정보가 수정되었습니다',
  };
};

export const deleteArtistTest = async (artistNo: number) => {
  await supabase.from('artists').delete().eq('artistNo', artistNo);

  return {
    message: '작가정보가 삭제되었습니다',
  };
};

export const postArtistTest = async (data: PostArtistRequest) => {
  const { error } = await supabase
    .from('artists')
    .insert({
      artistName: data.artistName,
      studentNo: data.studentNo,
      cohort: data.cohort,
    })
    .select('artistNo, artistName, studentNo, cohort');

  if (error) {
    toast.error(error.message);
  }

  return {
    message: '작가정보가 추가되었습니다',
  };
};
