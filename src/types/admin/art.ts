import { ArtArtistRel, Artist, Arts } from '@/types';

export type PostAdminArtRequest = Pick<Artist, 'artistNo'> &
  Pick<Arts, 'artName' | 'artType' | 'filesNo' | 'galleriesNo'> &
  Partial<Pick<Arts, 'caption'>> &
  Partial<Pick<ArtArtistRel, 'description'>>;
