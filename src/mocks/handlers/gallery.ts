import { ART_CONTENT } from '@/constants/gallery/art';
import {
  ART_DETAILS,
  REVIEW_CONTENT,
  UPLOAD_FILE_RESPONSE,
} from '@/constants/gallery/art-details';
import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

export const galleryHandlers = [
  // GET 작품 상세 조회 /gallery/arts/:artsNo
  http.get(`${API_URL}/galleries/arts/:artsNo`, async ({ params }) => {
    const art = ART_DETAILS.find((art) => art.artsNo === Number(params.artsNo));

    if (!art) {
      return HttpResponse.json(
        { message: '요청한 작품을 찾을 수 없습니다.' },
        { status: 400 }
      );
    }

    return HttpResponse.json(art, { status: 200 });
  }),

  // GET 작품 전체 조회 /gallery/arts
  http.get(`${API_URL}/galleries/arts`, async ({ request }) => {
    const url = new URL(request.url);
    const lastId = url.searchParams.get('lastId');
    const cohort = url.searchParams.get('cohort');

    const pageSize = 9;
    let allArts = ART_CONTENT.content;

    let startIndex = 0;
    if (lastId) {
      startIndex =
        allArts.findIndex((art) => art.artsNo === Number(lastId)) + 1;
    }

    if (cohort) {
      allArts = allArts.filter((art) =>
        art.artists.some((artist) => artist.cohort === Number(cohort))
      );
    }

    const paginatedArts = allArts.slice(startIndex, startIndex + pageSize);
    const hasNext = startIndex + pageSize < allArts.length;

    return HttpResponse.json(
      {
        content: paginatedArts,
        lastId: paginatedArts[paginatedArts.length - 1]?.artsNo,
        totalElements: allArts.length,
        hasNext,
      },
      { status: 200 }
    );
  }),

  // GET 리뷰(댓글) 조회
  http.get(`${API_URL}/galleries/arts/:artsNo/reviews`, async () => {
    return HttpResponse.json(REVIEW_CONTENT, { status: 200 });
  }),

  // POST 리뷰(댓글) 작성
  http.post(`${API_URL}/galleries/arts/:artsNo/reviews`, async () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  // PATCH 리뷰(댓글) 수정
  http.patch(
    `${API_URL}/galleries/arts/:artsNo/reviews/:reviewNo`,
    async () => {
      return HttpResponse.json({}, { status: 200 });
    }
  ),

  // DELETE 리뷰(댓글) 삭제
  http.delete(
    `${API_URL}/galleries/arts/:artsNo/reviews/:reviewNo`,
    async () => {
      return HttpResponse.json({}, { status: 200 });
    }
  ),

  // POST 첨부파일 업로드
  http.post(`${API_URL}/files`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return HttpResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    return HttpResponse.json(UPLOAD_FILE_RESPONSE, { status: 200 });
  }),

  // DELETE 첨부파일 삭제
  http.delete(`${API_URL}/files/:fileNo`, async ({ params }) => {
    const fileNo = params.fileNo;

    if (!fileNo) {
      return HttpResponse.json(
        { message: '파일 번호가 없습니다.' },
        { status: 400 }
      );
    }

    return HttpResponse.json({}, { status: 200 });
  }),
];
