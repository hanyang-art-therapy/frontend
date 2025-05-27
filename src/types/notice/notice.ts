import { Files, Notice, PaginationResponse } from '@/types';

export type NoticeCategory = 'NOTICE' | 'PINNED';

export type PostNoticeRequest = Pick<Notice, 'title' | 'content'> & {
  category: NoticeCategory;
  filesNo: number[] | null;
};

export type GetNoticesRequest = {
  page: number;
  keyword: string;
};

export type GetNoticeRequest = Pick<Notice, 'noticeNo'>;
export type UpdateNoticeRequest = Pick<Notice, 'noticeNo'> &
  Partial<
    Pick<Notice, 'title' | 'content' | 'category'> & {
      filesNo: number[] | null;
    }
  >;

export type GetNoticesResponse = PaginationResponse<Notice>;
export type GetNoticeResponse = Omit<Notice, 'userNo' | 'filesNo'> & {
  file: Pick<Files, 'filesNo' | 'name' | 'url'>;
};
