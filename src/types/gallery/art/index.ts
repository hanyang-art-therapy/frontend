import { Arts, Files, Artist, ArtArtistRel } from '@/types';

export type Art = Pick<Arts, 'artsNo' | 'artName' | 'coDescription'> & {
  files: Pick<Files, 'url'>;
  artists: (Pick<Artist, 'artistName' | 'cohort'> &
    Pick<ArtArtistRel, 'description'>)[];
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
