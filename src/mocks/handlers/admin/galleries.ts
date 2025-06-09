import { http, HttpResponse } from 'msw';
import { ADMIN_GALLERIES_MOCK_DATA } from '@/constants/admin/gallery';
import { PatchGalleryRequest } from '@/types/admin/galleries';

const API_URL = import.meta.env.VITE_API_URL;

let galleries = [...ADMIN_GALLERIES_MOCK_DATA];

export const adminGalleryHandlers = [
  // [GET] 전시회 전체 조회
  http.get(`${API_URL}/admin/galleries`, () => {
    return HttpResponse.json(galleries);
  }),

  // [PATCH] 전시회 정보 수정
  http.patch(
    `${API_URL}/admin/galleries/:galleriesNo`,
    async ({ params, request }) => {
      const { galleriesNo } = params;
      const patch = (await request.json()) as PatchGalleryRequest;
      const idx = galleries.findIndex(
        (a) => a.galleriesNo === Number(galleriesNo)
      );

      if (idx === -1) {
        return HttpResponse.json(
          { message: '해당 전시회가 존재하지 않습니다.' },
          { status: 404 }
        );
      }

      galleries[idx] = {
        ...galleries[idx],
        ...patch,
      };

      return HttpResponse.json(
        { message: '전시회 수정이 완료되었습니다.' },
        { status: 200 }
      );
    }
  ),

  // [DELETE] 전시회 삭제
  http.delete(`${API_URL}/admin/galleries/:galleriesNo`, async ({ params }) => {
    const { galleriesNo } = params;
    const idx = galleries.findIndex(
      (a) => a.galleriesNo === Number(galleriesNo)
    );

    if (idx === -1) {
      return HttpResponse.json(
        { message: '해당 작가가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    galleries.splice(idx, 1);

    return HttpResponse.json({
      status: 200,
      message: '전시회 삭제가 완료되었습니다.',
    });
  }),

  // [POST] 전시회 등록
  http.post(
    `${API_URL}/admin/galleries`,
    async ({ request }: { request: Request }) => {
      const { title, startDate, endDate } = await request.json();

      const galleriesNo =
        galleries.length > 0
          ? Math.max(...galleries.map((a) => a.galleriesNo)) + 1
          : 1;

      const newGallery = {
        galleriesNo,
        title,
        startDate,
        endDate,
      };

      galleries.push(newGallery);

      return HttpResponse.json({
        status: 200,
        message: '전시회 등록이 완료되었습니다.',
        data: newGallery,
      });
    }
  ),
];
