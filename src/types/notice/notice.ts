import { Files, Notice, PaginationResponse } from '@/types';

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
    Pick<Notice, 'title' | 'content' | 'category'> & {
      filesNo: number[] | null;
    }
  >;

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
