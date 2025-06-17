import { getArtists } from '@/apis/admin/artists';
import { getAdminArts } from '@/apis/admin/arts';
import { getGalleries } from '@/apis/admin/galleries';

export const adminArtsLoader = async () => {
  const [artsResponse, galleriesResponse, artistsResponse] = await Promise.all([
    getAdminArts({}),
    getGalleries(),
    getArtists({}),
  ]);

  return { artsResponse, galleriesResponse, artistsResponse };
};
