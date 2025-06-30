import { getCohorts, getYears } from '@/apis/gallery/art';
import type { GetCohortsResponse, GetYearsResponse } from '@/types/gallery/art';

export type GalleryLoaderData = {
  cohortsResponse: GetCohortsResponse;
  yearsResponse: GetYearsResponse;
};

export const galleryLoader = async ({
  request,
}: {
  request: Request;
}): Promise<GalleryLoaderData> => {
  const url = new URL(request.url);
  const yearParam = url.searchParams.get('year');

  const year = yearParam ? Number(yearParam) : new Date().getFullYear();

  const [cohortsResponse, yearsResponse] = await Promise.all([
    getCohorts({ year }),
    getYears(),
  ]);

  return { cohortsResponse, yearsResponse };
};
