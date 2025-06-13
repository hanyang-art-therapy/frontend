import { getArts, getCohorts, getYears } from '@/apis/gallery/art';
import type { ArtsPagination } from '@/types';
import type {
  Art,
  GetCohortsResponse,
  GetYearsResponse,
} from '@/types/gallery/art';

export type GalleryLoaderData = {
  artsResponse: ArtsPagination<Art>;
  cohortsResponse: GetCohortsResponse;
  yearsResponse: GetYearsResponse;
};

export const galleryLoader = async (): Promise<GalleryLoaderData> => {
  const [artsResponse, cohortsResponse, yearsResponse] = await Promise.all([
    getArts({}),
    getCohorts(),
    getYears(),
  ]);

  return { artsResponse, cohortsResponse, yearsResponse };
};
