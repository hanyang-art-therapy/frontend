import { ArtArtistRel, Artist, Arts } from '@/types';

// [GET] 조회 및 상세조회
export type AdminArtResponse = Pick<
  Arts,
  | 'artsNo'
  | 'artName'
  | 'caption'
  | 'artType'
  | 'filesNo'
  | 'galleriesNo'
  | 'coDescription'
> & {
  fileUrl: string;
  galleriesTitle: string;
  artists: Array<
    Pick<Artist, 'artistNo' | 'artistName'> & Pick<ArtArtistRel, 'description'>
  >;
};

// [POST] 등록 요청
export type PostAdminArtRequest = Pick<
  Arts,
  | 'artName'
  | 'artType'
  | 'filesNo'
  | 'galleriesNo'
  | 'caption'
  | 'coDescription'
> & {
  artistList: Array<
    Pick<Artist, 'artistNo'> & Pick<ArtArtistRel, 'description'>
  >;
};

// [PATCH] 수정 요청
export type PatchAdminArtRequest = Pick<
  Arts,
  | 'artsNo'
  | 'artName'
  | 'artType'
  | 'filesNo'
  | 'galleriesNo'
  | 'caption'
  | 'coDescription'
> & {
  artistList: Array<
    Pick<Artist, 'artistNo'> & Pick<ArtArtistRel, 'description'>
  >;
};

// [DELETE] 삭제 요청
export type DeleteAdminArtRequest = Pick<Arts, 'artsNo'>;
