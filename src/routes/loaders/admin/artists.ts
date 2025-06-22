import { getArtists } from '@/apis/admin/artists';

export const adminArtistLoader = async () => {
  const response = await getArtists({});

  return response;
};
