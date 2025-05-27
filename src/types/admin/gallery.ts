import { Gallery } from '@/types';

export type PostAdminGalleryRequest = Pick<
  Gallery,
  'title' | 'startDate' | 'endDate' | 'galleriesNo'
>;
