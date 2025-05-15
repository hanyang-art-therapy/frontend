import { ART_CONTENT } from '@/constants/gallery/art';
import {
  ART_DETAILS,
  REVIEW_CONTENT,
  UPLOAD_FILE_RESPONSE,
} from '@/constants/gallery/art-details';
import { http, HttpResponse } from 'msw';

export const galleryHandlers = [
  http.get('/galleries/arts/:artsNo', async ({ params }) => {
    const art = ART_DETAILS.find((art) => art.artsNo === Number(params.artsNo));

    if (!art) {
      return HttpResponse.json(
        { message: '요청한 작품을 찾을 수 없습니다.' },
        { status: 400 }
      );
    }

    return HttpResponse.json(art, { status: 200 });
  }),

  http.get('/galleries/arts', async ({ request }) => {
    const url = new URL(request.url);
    const lastId = url.searchParams.get('lastId');

    const pageSize = 9;
    const allArts = ART_CONTENT.content;

    let startIndex = 0;
    if (lastId) {
      startIndex =
        allArts.findIndex((art) => art.artsNo === Number(lastId)) + 1;
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

  http.get('/galleries/arts/:artsNo/reviews', async () => {
    return HttpResponse.json(REVIEW_CONTENT, { status: 200 });
  }),

  http.post('/galleries/arts/:artsNo/reviews', async () => {
    return HttpResponse.json({}, { status: 201 });
  }),

  http.post('/files', async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return HttpResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
    }

    return HttpResponse.json(UPLOAD_FILE_RESPONSE, { status: 200 });
  }),

  http.patch('/galleries/arts/:artsNo/reviews/:reviewNo', async () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  http.delete('/galleries/arts/:artsNo/reviews/:reviewNo', async () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
