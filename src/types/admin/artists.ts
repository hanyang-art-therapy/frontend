import { Artist } from '@/types';

// [GET] 조회 및 상세조회
export type ArtistResponse = Artist;

// [PATCH] 수정 요청
export type PatchArtistRequest = Pick<
  Artist,
  'artistNo' | 'artistName' | 'studentNo' | 'cohort'
>;

// [DELETE] 삭제 요청
export type DeleteArtistRequest = Pick<Artist, 'artistNo'>;

// [POST] 등록 요청
export type PostArtistRequest = Omit<Artist, 'artistNo'>;
