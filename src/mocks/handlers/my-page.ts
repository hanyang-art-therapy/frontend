import { POST_MOCK_DATA, REVIEW_MOCK_DATA } from '@/constants/my-page/my-page';
import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

export const myPageHandlers = [
  // GET 내가 작성한 리뷰 목록 조회
  http.get(`${API_URL}/my-page/my-reviews`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const keyword = url.searchParams.get('keyword');

    let filteredData = REVIEW_MOCK_DATA;

    if (keyword) {
      filteredData = filteredData.filter((review) =>
        review.reviewText.includes(keyword)
      );
    }

    return HttpResponse.json(
      {
        content: filteredData.slice((page - 1) * 5, page * 5),
        page,
        size: 5,
        totalElements: filteredData.length,
        totalPages: Math.ceil(filteredData.length / 5),
      },
      { status: 200 }
    );
  }),

  // GET 내가 작성한 게시글 목록 조회
  http.get(`${API_URL}/my-page/my-posts`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;

    return HttpResponse.json(
      {
        content: POST_MOCK_DATA.slice((page - 1) * 10, page * 10),
        page,
        size: 10,
        totalElements: POST_MOCK_DATA.length,
        totalPages: Math.ceil(POST_MOCK_DATA.length / 10),
      },
      { status: 200 }
    );
  }),

  // GET 내 정보 조회
  http.get(`${API_URL}/my-page/profile`, async () => {
    return HttpResponse.json(
      {
        userId: 1,
        email: 'user1@example.com',
        userName: '강송이',
        role: 'ARTIST',
        studentNo: '2023191840',
      },
      { status: 200 }
    );
  }),

  // PATCH 내 정보 수정
  http.patch(`${API_URL}/my-page/profile`, async () => {
    return HttpResponse.json(
      { message: '수정이 완료되었습니다.' },
      { status: 200 }
    );
  }),

  // PATCH 회원 탈퇴
  http.patch(`${API_URL}/my-page/withdraw`, async () => {
    return HttpResponse.json(
      { message: '회원 탈퇴가 완료되었습니다.' },
      { status: 200 }
    );
  }),
];
