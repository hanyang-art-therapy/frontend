import { ArtArtistRel, Artist, Arts } from '@/types';

// [GET] 조회 및 상세조회
export type AdminArtResponse = {
  artsNo: number;
  artName: string;
  caption: string;
  artType: 'SINGLE' | 'GROUP';
  fileUrl: string;
  filesNo: number;
  galleriesNo: number;
  galleriesTitle: string;
  coDescription: string | null;
  artists: {
    artistNo: Artist['artistNo'];
    artistName: Artist['artistName'];
    description: ArtArtistRel['description'];
  }[];
};

// [POST] 등록 요청
export type PostAdminArtRequest = Pick<
  Arts,
  'artName' | 'artType' | 'filesNo' | 'galleriesNo'
> & {
  caption?: string;
  coDescription?: string | null;
  artistList: {
    artistNo: Artist['artistNo'];
    artistName: Artist['artistName'];
    description: ArtArtistRel['description'];
  }[];
};

// [PATCH] 수정 요청
export type PatchAdminArtRequest = {
  artsNo: Arts['artsNo'];
} & Partial<Omit<PostAdminArtRequest, 'artistList'>> & {
    galleriesNo?: number;
    artistList?: {
      artistNo: Artist['artistNo'];
      artistName: Artist['artistName'];
      description: ArtArtistRel['description'];
    }[];
  };

// [DELETE] 삭제 요청
export type DeleteAdminArtRequest = Pick<Arts, 'artsNo'>;
