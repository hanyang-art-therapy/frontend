import { http, HttpResponse } from 'msw';
import { ADMIN_ARTISTS_MOCK_DATA } from '@/constants/admin/artists';
import { PatchArtistRequest } from '@/types/admin/artists';

const API_URL = import.meta.env.VITE_API_URL;

export const adminArtistHandlers = [
  // [GET] 작가 전체 조회
  http.get(`${API_URL}/admin/artists`, async () => {
    return HttpResponse.json(ADMIN_ARTISTS_MOCK_DATA);
  }),

  // [GET] 작가 상세 조회
  http.get(`${API_URL}/admin/artists/:artistNo`, async ({ params }) => {
    const { artistNo } = params;

    const artist = ADMIN_ARTISTS_MOCK_DATA.find(
      (artist) => artist.artistNo === Number(artistNo)
    );

    if (!artist) {
      return HttpResponse.json(
        {
          message: '해당 작가는 존재하지 않습니다.',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(artist);
  }),

  // [PATCH] 작가 수정
  http.patch(
    `${API_URL}/admin/artists/:artistNo`,
    async ({ params, request }) => {
      const { artistNo } = params;
      const { artistName, studentNo, cohort } =
        (await request.json()) as PatchArtistRequest;

      const artist = ADMIN_ARTISTS_MOCK_DATA.find(
        (artist) => artist.artistNo === Number(artistNo)
      );

      if (!artist) {
        return HttpResponse.json(
          {
            message: '해당 작가는 존재하지 않습니다.',
          },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        ...artist,
        ...(artistName !== undefined ? { artistName } : {}),
        ...(studentNo !== undefined ? { studentNo } : {}),
        ...(cohort !== undefined ? { cohort } : {}),
      });
    }
  ),

  // [DELETE] 작가 삭제
  http.delete(
    `${API_URL}/admin/artists/:artistNo`,
    async ({ params: { artistNo } }) => {
      const artist = ADMIN_ARTISTS_MOCK_DATA.find(
        (artist) => artist.artistNo === Number(artistNo)
      );

      if (!artist) {
        return HttpResponse.json(
          {
            message: '해당 작가는 존재하지 않습니다.',
          },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        status: 204,
        artistNo: artist.artistNo,
      });
    }
  ),

  // [POST] 작가 등록
  http.post(
    `${API_URL}/admin/artists`,
    async ({ request }: { request: Request }) => {
      const { artistName, studentNo, cohort } = await request.json();

      if (studentNo === '000000000') {
        return HttpResponse.json(
          {
            message: '이미 등록된 학번입니다.',
          },
          { status: 409 }
        );
      }

      return HttpResponse.json({
        status: 201,
        message: '등록이 완료되었습니다.',
        data: {
          artistName,
          studentNo,
          cohort,
        },
      });
    }
  ),
];
