import { ArtArtistRel, Artist, Arts, Gallery } from '@/types';

// [GET] 조회 및 상세조회
export type AdminArtsResponse = {
  artsNo: number;
  artName: string;
  galleriesNo: number;
  galleriesTitle: string;
  artists: string[];
};

export type AdminArtResponse = Pick<
  Arts,
  'artsNo' | 'artName' | 'caption' | 'artType' | 'coDescription'
> &
  Pick<Gallery, 'title' | 'galleriesNo'> & {
    fileUrl: string;
    artists: (Pick<Artist, 'artistNo'> &
      Pick<ArtArtistRel, 'description'> & { name: string })[];
  };

// [POST] 등록 요청
export type PostAdminArtRequest = Pick<
  Arts,
  'artName' | 'artType' | 'filesNo' | 'galleriesNo'
> & {
  caption: string;
  coDescription?: string | null;
  artistList: (Pick<Artist, 'artistNo'> & Pick<ArtArtistRel, 'description'>)[];
};

// [PATCH] 수정 요청
export type PatchAdminArtRequest = Pick<
  Arts,
  | 'artsNo'
  | 'galleriesNo'
  | 'artName'
  | 'caption'
  | 'artType'
  | 'coDescription'
  | 'artsNo'
> & {
  filesNo: number | null;
  artists:
    | (Pick<Artist, 'artistNo'> & Pick<ArtArtistRel, 'description'>)[]
    | [];
};

// [DELETE] 삭제 요청
export type DeleteAdminArtRequest = Pick<Arts, 'artsNo'>;
