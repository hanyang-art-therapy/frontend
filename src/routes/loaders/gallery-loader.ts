import { getArts } from '@/apis/gallery/art';

export const galleryLoader = async () => {
  const response = await getArts({});

  return response;
};
