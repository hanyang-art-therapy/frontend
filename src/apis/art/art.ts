import apiInstance from '@/lib/axios';
import type { ArtsPagination } from '@/types';
import type { Art, ArtDetail, ArtsRequest } from '@/types/gallery/art';
import axios from 'axios';

// GET 작품 전체 조회 /gallery/arts
export const getArts = async ({
  lastId,
  year,
  cohort,
}: ArtsRequest): Promise<ArtsPagination<Art>> => {
  const response = await apiInstance.get('/galleries/arts', {
    params: { lastId, year, cohort },
  });

  return response.data;
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
  const response = await apiInstance.get(`/galleries/arts/${artsNo}`);

  return response.data;
};

export const getArtDetailMocking = async (
  artNo: number
): Promise<ArtDetail> => {
  const response = await axios.get(`/galleries/arts/${artNo}`);

  return response.data;
};
