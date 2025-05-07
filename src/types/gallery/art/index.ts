import { Arts, Files, Artist } from '@/types';

export type Art = Pick<Arts, 'artsNo' | 'galleriesNo'> & {
  files: Pick<
    Files,
    'filesNo' | 'name' | 'url' | 'filesSize' | 'extension' | 'filesType'
  >;
  artist: Pick<Artist, 'artistName' | 'cohort'>;
};
