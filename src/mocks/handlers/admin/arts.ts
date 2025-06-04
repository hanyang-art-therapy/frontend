import { http, HttpResponse } from 'msw';
import { ADMIN_ARTS_MOCK_DATA } from '@/constants/admin/arts';

const API_URL = import.meta.env.VITE_API_URL;

export const adminArtsHandlers = [
  // [GET] 작품 전체 조회
  http.get(`${API_URL}/admin/arts`, async () => {
    return HttpResponse.json(ADMIN_ARTS_MOCK_DATA);
  }),

  // [GET] 작품 상세 조회
  http.get(`${API_URL}/admin/arts/:artsNo`, async ({ params }) => {
    const { artsNo } = params;
    const art = ADMIN_ARTS_MOCK_DATA.find(
      (item) => item.artsNo === Number(artsNo)
    );
    if (!art) {
      return HttpResponse.json(
        { message: '해당 작품이 존재하지 않습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json(art);
  }),

  // [PATCH] 작품 수정
  http.patch(`${API_URL}/admin/arts/:artsNo`, async ({ params, request }) => {
    const { artsNo } = params;
    const {
      artName,
      artType,
      filesNo,
      galleriesNo,
      caption,
      coDescription,
      artistList,
    } = (await request.json()) as {
      artName: string;
      artType: string;
      filesNo: 0;
      galleriesNo: 0;
      caption: string;
      coDescription: string;
      artistList: string;
    };

    const arts = ADMIN_ARTS_MOCK_DATA.find(
      (arts) => arts.artsNo === Number(artsNo)
    );

    if (!arts) {
      return HttpResponse.json(
        {
          message: '해당 작품이 존재하지 않습니다.',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      ...arts,
      ...(artName !== undefined ? { artName } : {}),
      ...(artType !== undefined ? { artType } : {}),
      ...(filesNo !== undefined ? { filesNo } : {}),
      ...(galleriesNo !== undefined ? { galleriesNo } : {}),
      ...(caption !== undefined ? { caption } : {}),
      ...(coDescription !== undefined ? { coDescription } : {}),
      ...(artistList !== undefined ? { artistList } : {}),
    });
  }),

  // [DELETE] 작품 삭제
  http.delete(
    `${API_URL}/admin/arts/:artsNo`,
    async ({ params: { artsNo } }) => {
      const arts = ADMIN_ARTS_MOCK_DATA.find(
        (arts) => arts.artsNo === Number(artsNo)
      );
      if (!arts) {
        return HttpResponse.json(
          {
            message: '해당 작가는 존재하지 않습니다.',
          },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        status: 204,
        artsNo: arts.artsNo,
      });
    }
  ),

  // [POST] 작품 등록
  http.post(
    `${API_URL}/admin/arts`,
    async ({ request }: { request: Request }) => {
      const body = await request.json();
      const {
        artName,
        artType,
        filesNo,
        galleriesNo,
        caption,
        coDescription,
        artistList,
      } = body;

      if (!artName || !filesNo || !galleriesNo) {
        return HttpResponse.json(
          { message: '필수 항목이 누락되었습니다.' },
          { status: 400 }
        );
      }

      const newArtsNo =
        ADMIN_ARTS_MOCK_DATA.length > 0
          ? Math.max(...ADMIN_ARTS_MOCK_DATA.map((a) => a.artsNo)) + 1
          : 1;

      const newArt = {
        artsNo: newArtsNo,
        artName,
        artType,
        filesNo,
        galleriesNo,
        caption,
        coDescription,
        fileUrl: `/mock-uploaded/art-image-${newArtsNo}.webp`,
        galleriesTitle: '임시 전시회',
        artists: artistList.map((artist: any) => ({
          artistNo: artist.artistNo,
          artistName: '임시작가',
          description: artist.description,
        })),
      };
      ADMIN_ARTS_MOCK_DATA.push(newArt);

      return HttpResponse.json(newArt);
    }
  ),
];
