import { Files, Notice } from '@/types';

export type NoticeCategory =
  | 'GENERAL'
  | 'PRACTICE'
  | 'RECRUIT'
  | 'EXHIBITION'
  | 'ACADEMIC';

export type PostNoticeRequest = Pick<
  Notice,
  'title' | 'content' | 'periodStart' | 'periodEnd' | 'isFixed'
> & {
  category: NoticeCategory;
  filesNo: number[] | null;
};

export type GetNoticesRequest = {
  page?: number;
  keyword?: string;
  category?: NoticeCategory;
};

export type GetNoticeRequest = Pick<Notice, 'noticeNo'>;

export type UpdateNoticeRequest = Pick<Notice, 'noticeNo'> &
  Partial<
    Pick<
      Notice,
      'title' | 'content' | 'category' | 'periodStart' | 'periodEnd' | 'isFixed'
    > & {
      filesNo: number[] | null;
    }
  >;

export type PatchNoticeRequest = {
  title: string;
  content: string;
  category: NoticeCategory;
  periodStart?: string;
  periodEnd?: string;
  isFixed?: boolean;
  filesNo: number[] | null;
};

export type PaginationResponse<T> = {
  content: T[];
  isLast: boolean;
  page: number;
  totalElements: number;
  totalPages: number;
};

export type GetNoticesResponse = PaginationResponse<GetNoticesContent>;

export type GetNoticesContent = Pick<
  Notice,
  'noticeNo' | 'category' | 'title' | 'createdAt' | 'viewCount'
> & {
  isFixed: boolean;
  hasFile: boolean;
};

export type GetNoticeResponse = Omit<Notice, 'userNo' | 'filesNo'> & {
  files: Pick<Files, 'filesNo' | 'name' | 'url'>[];
  previous: NoticeNav;
  next: NoticeNav;
};

export type NoticeNav = Pick<Notice, 'noticeNo' | 'title' | 'createdAt'>;
