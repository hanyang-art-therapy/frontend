import { getArtists } from '@/apis/admin/artists';
import { getAdminArts } from '@/apis/admin/arts';
import { getGalleries } from '@/apis/admin/galleries';
import { getArtistsTest } from '@/apis/admin/tester/artists';
import { getAdminArtsTest } from '@/apis/admin/tester/arts';
import { getGalleriesTest } from '@/apis/admin/tester/galleries';
import { initializeAuth } from '@/apis/auth/init-auth';
import { useAuthStore } from '@/store/auth';

export const adminArtsLoader = async () => {
  await initializeAuth();

  const { role } = useAuthStore.getState();

  if (role === 'TESTER') {
    const [artsResponse, galleriesResponse, artistsResponse] =
      await Promise.all([
        getAdminArtsTest({}),
        getGalleriesTest(),
        getArtistsTest({}),
      ]);

    return {
      artsResponse,
      galleriesResponse,
      artistsResponse,
    };
  }

  const [artsResponse, galleriesResponse, artistsResponse] = await Promise.all([
    getAdminArts({}),
    getGalleries(),
    getArtists({}),
  ]);

  return { artsResponse, galleriesResponse, artistsResponse };
};
