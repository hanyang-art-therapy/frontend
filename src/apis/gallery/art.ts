import apiInstance from '@/lib/axios';
import type { ArtsPagination } from '@/types';
import type {
  Art,
  ArtDetail,
  ArtsRequest,
  GetCohortsResponse,
  GetYearsResponse,
} from '@/types/gallery/art';

// GET 작품 전체 조회 /gallery/arts
export const getArts = async ({
  lastId,
  year,
  cohort,
}: Partial<ArtsRequest>): Promise<ArtsPagination<Art>> => {
  const response = await apiInstance.get('/galleries/arts', {
    params: { lastId, year, cohort },
  });

  return response.data;
};

// GET /gallery/arts/:artsNo
export const getArtDetail = async (artsNo: number): Promise<ArtDetail> => {
  const response = await apiInstance.get(`/galleries/arts/${artsNo}`);

  return response.data;
};

export const getYears = async (): Promise<GetYearsResponse> => {
  const response = await apiInstance.get('/galleries/years');

  return response.data;
};

export const getCohorts = async (): Promise<GetCohortsResponse> => {
  const response = await apiInstance.get('/galleries/cohorts');

  return response.data;
};
