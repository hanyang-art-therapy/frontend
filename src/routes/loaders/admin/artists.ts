import { getArtists } from '@/apis/admin/artists';
import { getArtistsTest } from '@/apis/admin/tester/artists';
import { useAuthStore } from '@/store/auth';

export const adminArtistLoader = async () => {
  const { role } = useAuthStore.getState();

  if (role === 'TESTER') {
    const response = await getArtistsTest({});

    return response;
  }

  const response = await getArtists({});

  return response;
};
