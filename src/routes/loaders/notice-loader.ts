import { getNotices } from '@/apis/notice/notice';
import { GetNoticesResponse } from '@/types/notice/notice';

export const noticeLoader = async (): Promise<GetNoticesResponse> => {
  const response = await getNotices({ page: 1 });

  return response;
};
