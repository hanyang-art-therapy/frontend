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
  totalElements: number;
  content: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type GetNoticesResponse = PaginationResponse<
  Pick<
    Notice,
    'noticeNo' | 'category' | 'title' | 'createdAt' | 'viewCount'
  > & {
    isFixed: boolean;
    hasFile: boolean;
  }
>;

export type GetNoticeResponse = Omit<Notice, 'userNo' | 'filesNo'> & {
  files: Pick<Files, 'filesNo' | 'name' | 'url'>[];
};
