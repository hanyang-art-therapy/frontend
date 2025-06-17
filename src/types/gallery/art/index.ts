import { Arts, Files, Artist, ArtArtistRel } from '@/types';

export type Art = Pick<Arts, 'artsNo' | 'artName' | 'coDescription'> & {
  files: Pick<Files, 'url'>;
  artists: (Pick<Artist, 'artistName' | 'cohort'> &
    Pick<ArtArtistRel, 'description'>)[];
};

export type ArtDetail = Pick<
  Arts,
  'artsNo' | 'artName' | 'caption' | 'createdAt' | 'coDescription'
> & {
  file: Pick<
    Files,
    'filesNo' | 'name' | 'url' | 'filesSize' | 'extension' | 'filesType'
  >;
  artists: (Pick<Artist, 'studentNo' | 'artistName' | 'cohort'> &
    Pick<ArtArtistRel, 'description'>)[];
};

export type ArtsRequest = {
  lastId?: number;
  year?: number;
  cohort?: number;
};

export type GetCohortsResponse = {
  cohorts: number[];
};

export type GetYearsResponse = {
  years: number[];
};
