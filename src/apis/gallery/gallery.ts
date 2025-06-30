import apiInstance from '@/lib/axios';
import type { ArtIntroResponse } from '@/types/gallery/gallery';

export const getArtIntro = async (): Promise<ArtIntroResponse> => {
  const response = await apiInstance.get(
    `/galleries/intro/${new Date().getFullYear()}`
  );

  return response.data;
};
