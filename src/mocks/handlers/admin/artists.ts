import { http, HttpResponse } from 'msw';
import { ADMIN_ARTISTS_MOCK_DATA } from '@/constants/admin/artists';
import { PatchArtistRequest } from '@/types/admin/artists';

const API_URL = import.meta.env.VITE_API_URL;

let artists = [...ADMIN_ARTISTS_MOCK_DATA];

export const adminArtistHandlers = [
  // [GET] 작가 전체 조회
  http.get(`${API_URL}/admin/artists`, () => {
    return HttpResponse.json(artists);
  }),

  // [PATCH] 작가 정보 수정
  http.patch(
    `${API_URL}/admin/artists/:artistNo`,
    async ({ params, request }) => {
      const { artistNo } = params;
      const patch = (await request.json()) as PatchArtistRequest;
      const idx = artists.findIndex((a) => a.artistNo === Number(artistNo));

      if (idx === -1) {
        return HttpResponse.json(
          { message: '해당 회원이 존재하지 않습니다.' },
          { status: 404 }
        );
      }

      artists[idx] = {
        ...artists[idx],
        ...patch,
      };

      return HttpResponse.json(artists[idx]);
    }
  ),

  // [DELETE] 작가 삭제
  http.delete(`${API_URL}/admin/artists/:artistNo`, async ({ params }) => {
    const { artistNo } = params;
    const idx = artists.findIndex((a) => a.artistNo === Number(artistNo));

    if (idx === -1) {
      return HttpResponse.json(
        { message: '해당 작가가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    artists.splice(idx, 1);

    return HttpResponse.json({ status: 204, artistNo: Number(artistNo) });
  }),

  // [POST] 작가 등록
  http.post(
    `${API_URL}/admin/artists`,
    async ({ request }: { request: Request }) => {
      const { artistName, studentNo, cohort } = await request.json();

      if (studentNo === '000000000') {
        return HttpResponse.json(
          { message: '이미 등록된 학번입니다.' },
          { status: 409 }
        );
      }

      const artistNo =
        artists.length > 0
          ? Math.max(...artists.map((a) => a.artistNo)) + 1
          : 1;
      const newArtist = {
        artistNo,
        artistName,
        studentNo,
        cohort,
      };

      artists.push(newArtist);

      return HttpResponse.json({
        status: 201,
        message: '등록이 완료되었습니다.',
        data: newArtist,
      });
    }
  ),
];
