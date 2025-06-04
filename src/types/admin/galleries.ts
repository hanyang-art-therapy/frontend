import { Gallery } from '@/types';

// [GET] 조회 및 상세조회
export type GalleryResponse = Gallery;

// [PATCH] 수정 요청
export type PatchGalleryRequest = Pick<
  Gallery,
  'galleriesNo' | 'title' | 'startDate' | 'endDate'
>;

// [DELETE] 삭제 요청
export type DeleteGalleryRequest = {
  galleriesNo: number;
};

// [POST] 등록 요청
export type PostGalleryRequest = Omit<Gallery, 'galleriesNo'>;
