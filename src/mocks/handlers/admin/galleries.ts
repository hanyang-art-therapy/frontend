import { http, HttpResponse } from 'msw';
import { ADMIN_GALLERIES_MOCK_DATA } from '@/constants/admin/gallery';
import { PatchGalleriesRequest } from '@/types/admin/galleries';

const API_URL = import.meta.env.VITE_API_URL;

export const adminGalleryHandlers = [
  // [GET] 전시회 전체 조회
  http.get(`${API_URL}/admin/galleries`, async () => {
    return HttpResponse.json({
      galleries: ADMIN_GALLERIES_MOCK_DATA,
    });
  }),

  // [GET] 전시회 상세 조회
  http.get(`${API_URL}/admin/galleries/:galleriesNo`, async ({ params }) => {
    const { galleriesNo } = params;
    return HttpResponse.json(
      ADMIN_GALLERIES_MOCK_DATA.find(
        (gallery) => gallery.galleriesNo === Number(galleriesNo)
      )
    );
  }),

  // [PATCH] 전시회 정보 수정
  http.patch(
    `${API_URL}/admin/galleries/:galleriesNo`,
    async ({ params, request }) => {
      const { galleriesNo } = params;
      const { title, startDate, endDate } =
        (await request.json()) as PatchGalleriesRequest;

      const gallery = ADMIN_GALLERIES_MOCK_DATA.find(
        (g) => g.galleriesNo === Number(galleriesNo)
      );
      if (!gallery) {
        return HttpResponse.json(
          { message: '해당 전시회가 존재하지 않습니다.' },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        ...gallery,
        ...(title !== undefined ? { title } : {}),
        ...(startDate !== undefined ? { startDate } : {}),
        ...(endDate !== undefined ? { endDate } : {}),
      });
    }
  ),

  // [DELETE] 전시회 삭제
  http.delete(`${API_URL}/admin/galleries/:galleriesNo`, async ({ params }) => {
    const { galleriesNo } = params;

    if (!galleriesNo) {
      return HttpResponse.json(
        { message: '해당 전시회가 존재하지 않습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ status: 204, galleriesNo: Number(galleriesNo) });
  }),

  // [POST] 전시회 등록
  http.post(
    `${API_URL}/admin/galleries`,
    async ({ request }: { request: Request }) => {
      const { title, startDate, endDate } = await request.json();

      return HttpResponse.json({
        galleriesNo: 1,
        title,
        startDate,
        endDate,
      });
    }
  ),
];
