import { supabase } from '@/lib/supabase';
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
import { toast } from 'sonner';

export const getAdminArtsTest = async ({
  filter,
  keyword,
}: InfiniteKeywordSearchRequest): Promise<
  InfiniteScrollResponse<AdminArtsResponse>
> => {
  if (filter && keyword) {
    const { data, error } = await supabase
      .from('arts')
      .select('*')
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

  const { data, error } = await supabase.rpc('get_admin_arts');

  if (error) {
    toast.error(error.message);
  }

  return { content: data } as InfiniteScrollResponse<AdminArtsResponse>;
};

export const getAdminArtTest = async (
  artsNo: number
): Promise<AdminArtResponse> => {
  const { data } = await supabase.rpc('get_admin_art', {
    arts_no_input: artsNo,
  });

  return data as AdminArtResponse;
};

export const patchAdminArt = async (
  artsNo: number,
  data: PatchAdminArtRequest
): Promise<MessageResponse> => {
  const { error } = await supabase
    .from('arts')
    .update({
      ...data,
    })
    .eq('artsNo', artsNo);

  if (error) {
    toast.error(error.message);
  }

  return {
    message: '작품정보가 수정되었습니다',
  };
};

export const deleteAdminArt = async (
  artsNo: number
): Promise<MessageResponse> => {
  const { error } = await supabase.from('arts').delete().eq('artsNo', artsNo);

  if (error) {
    toast.error(error.message);
  }

  return {
    message: '작품 삭제가 완료되었습니다',
  };
};

export const postAdminArtTest = async (
  data: PostAdminArtRequest
): Promise<MessageResponse> => {
  const { error } = await supabase.from('arts').insert(data);

  if (error) {
    toast.error(error.message);
  }

  return {
    message: '작품정보가 등록되었습니다',
  };
};
