import { Arts, Files, Artist, ArtArtistRel } from '@/types';

export type Art = Pick<Arts, 'artsNo' | 'artName'> & {
  files: Pick<Files, 'url'>;
  artist: Pick<Artist, 'artistName' | 'cohort'>[];
};

export type ArtDetail = Pick<
  Arts,
  'artsNo' | 'artName' | 'caption' | 'createdAt'
> &
  Pick<ArtArtistRel, 'description'> & {
    file: Pick<
      Files,
      'filesNo' | 'name' | 'url' | 'filesSize' | 'extension' | 'filesType'
    >;
    artist: Pick<Artist, 'studentNo' | 'artistName' | 'cohort'>[];
  };

export type ArtsRequest = {
  lastId?: number;
  year?: number;
  cohort?: number;
};
