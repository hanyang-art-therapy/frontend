import { Arts, Files, Artist } from '@/types';

export type Art = Pick<Arts, 'artsNo' | 'artName' | 'galleriesNo'> & {
  files: Pick<Files, 'url'>;
  artist: Pick<Artist, 'artistName' | 'cohort'>;
};
