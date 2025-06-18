//import apiInstance from '@/lib/axios';
import apiInstance from '@/lib/axios';
import { MessageResponse } from '@/types';
import type {
  GetNoticeRequest,
  GetNoticeResponse,
  GetNoticesRequest,
  GetNoticesResponse,
  PostNoticeRequest,
  UpdateNoticeRequest,
} from '@/types/notice/notice';

// GET 공지사항 전체 조회
export const getNotices = async ({
  page,
  keyword,
}: GetNoticesRequest): Promise<GetNoticesResponse> => {
  const response = await apiInstance.get('/notices', {
    params: { page, keyword },
  });

  return response.data;
};

// GET 공지사항 상세 조회
export const getNotice = async ({
  noticeNo,
}: GetNoticeRequest): Promise<GetNoticeResponse> => {
  const response = await apiInstance.get(`/notices/${noticeNo}`);

  return response.data;
};

// POST 공지사항 작성 /notices
export const postNotice = async ({
  title,
  content,
  category,
  periodStart,
  periodEnd,
  isFixed,
  filesNo,
}: PostNoticeRequest): Promise<GetNoticeResponse> => {
  const response = await apiInstance.post('/notices', {
    title,
    content,
    category,
    periodStart,
    periodEnd,
    isFixed,
    filesNo,
  });

  return response.data;
};

// PATCH 공지사항 수정 /notices/:noticeNo
export const updateNotice = async ({
  noticeNo,
  title,
  category,
  periodStart,
  periodEnd,
  content,
  filesNo,
  isFixed,
}: UpdateNoticeRequest): Promise<GetNoticeResponse> => {
  const response = await apiInstance.patch(`/notices/${noticeNo}`, {
    // noticeNo,
    title,
    category,
    periodStart,
    periodEnd,
    content,
    filesNo,
    isFixed,
  });

  return response.data;
};

// DELETE 공지사항 삭제 /notices/:noticeNo
export const deleteNotice = async ({
  noticeNo,
}: GetNoticeRequest): Promise<MessageResponse> => {
  const response = await apiInstance.delete(`/notices/${noticeNo}`);

  return response.data;
};

// 🔧 추가: 파일 업로드 API
export const uploadFiles = async (formData: FormData): Promise<{ filesNo: number[] }> => {
  const response = await apiInstance.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};