import { supabase } from '@/lib/supabase';
import type { ArtsPagination } from '@/types';
import type { Art, ArtDetail, ArtsRequest } from '@/types/gallery/art';
import axios from 'axios';

// GET 작품 전체 조회 /gallery/arts
export const getArts = async (): Promise<Art[]> => {
  const { data, error } = await supabase.rpc('get_arts');

  if (error) throw new Error('작품이 존재하지 않습니다.');

  return data;
};

export const getArtsMocking = async ({
  lastId,
  year,
  cohort,
}: ArtsRequest): Promise<ArtsPagination<Art>> => {
  const response = await axios.get('/galleries/arts', {
    params: { lastId, year, cohort },
  });

  return response.data;
};

// GET /gallery/arts/:artsNo
export const getArtDetail = async (artsNo: number): Promise<ArtDetail> => {
  const { data, error } = await supabase.rpc('get_art_detail', {
    arts_id: artsNo,
  });

  if (error) throw new Error('작품이 존재하지 않습니다.');

  return data;
};

export const getArtDetailMocking = async (
  artNo: number
): Promise<ArtDetail> => {
  const response = await axios.get(`/galleries/arts/${artNo}`);

  return response.data;
};
