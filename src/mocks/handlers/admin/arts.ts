import type {
  PatchAdminArtRequest,
  PostAdminArtRequest,
} from '@/types/admin/arts';
import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

let nextArtsNo = 3;
let nextFilesNo = 3;
const uploadedFiles = new Map<number, string>();

const arts = [
  {
    artsNo: 1,
    artName: '빛의 기억',
    caption: 'Acrylic on canvas 50x50cm',
    artType: 'SINGLE',
    fileUrl: '/images/arts/art.jpg',
    filesNo: 1,
    galleriesNo: 1,
    galleriesTitle: '봄의 전시회',
    coDescription: '',
    artists: [
      {
        artistNo: 1,
        artistName: '김민수',
        description: '빛을 통해 과거의 감정을 회상했습니다.',
      },
    ],
  },
  {
    artsNo: 2,
    artName: '연결고리',
    caption: 'Mixed media 120x80cm',
    artType: 'GROUP',
    fileUrl: '/images/arts/art.jpg',
    filesNo: 2,
    galleriesNo: 2,
    galleriesTitle: '여름의 전시회',
    coDescription: '우리는 연결되어 있습니다.',
    artists: [
      {
        artistNo: 2,
        artistName: '이지은',
        description: '사람 간의 관계를 상징적으로 표현했습니다.',
      },
      {
        artistNo: 1,
        artistName: '김민수',
        description: '빛을 통해 과거의 감정을 회상했습니다.',
      },
    ],
  },
  {
    artsNo: 3,
    artName: '빛의 기억',
    caption: 'Acrylic on canvas 50x50cm',
    artType: 'SINGLE',
    fileUrl: '/images/arts/art.jpg',
    filesNo: 3,
    galleriesNo: 2,
    galleriesTitle: '여름의 전시회',
    coDescription: '',
    artists: [
      {
        artistNo: 2,
        artistName: '이지은',
        description: '사람 간의 관계를 상징적으로 표현했습니다.',
      },
    ],
  },
];

export const adminArtsHandlers = [
  // [GET] 작품 조회
  http.get(`${API_URL}/admin/arts`, async () => {
    return HttpResponse.json(arts);
  }),

  // [POST] 작품 업로드
  http.post(`${API_URL}/admin/arts`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return HttpResponse.json(
        { message: '파일 업로드 실패' },
        { status: 400 }
      );
    }
    const filesNo = nextFilesNo++;
    const filename = encodeURIComponent((file as File).name);
    const url = `http://localhost:5173/images/example/${filename}`;
    uploadedFiles.set(filesNo, url);
    return HttpResponse.json({ filesNo, url, message: '파일 업로드 성공' });
  }),

  // [POST] 작품 등록
  http.post(`${API_URL}/admin/arts`, async ({ request }) => {
    const data = (await request.json()) as PostAdminArtRequest;
    const newArt = {
      artsNo: nextArtsNo++,
      artName: data.artName,
      caption: data.caption ?? '',
      artType: data.artType,
      fileUrl: uploadedFiles.get(data.filesNo) ?? '',
      filesNo: data.filesNo,
      galleriesTitle: '모의 전시회',
      coDescription: data.coDescription ?? '',
      artists: data.artistList.map((artist) => ({
        artistNo: artist.artistNo,
        description: artist.description,
        artistName: '이름',
      })),
      galleriesNo: 0,
    };

    arts.push(newArt);
    return HttpResponse.json({ message: '작품 등록 성공' });
  }),

  // [PATCH] 작품 수정
  http.patch(`${API_URL}/admin/arts/:artsNo`, async ({ request, params }) => {
    const update = (await request.json()) as PatchAdminArtRequest;
    const index = arts.findIndex((a) => a.artsNo === Number(params.artsNo));
    if (index === -1) return HttpResponse.json({}, { status: 404 });

    const old = arts[index];
    const filesNo = update.filesNo ?? old.filesNo;
    arts[index] = {
      ...old,
      ...update,
      filesNo,
      fileUrl: uploadedFiles.get(filesNo) ?? old.fileUrl,
      coDescription: update.coDescription ?? old.coDescription,
      artists: (update.artists ?? []).map((a) => ({
        artistNo: a.artistNo,
        artistName: '이름',
        description: a.description,
      })),
    };
    return HttpResponse.json(arts[index]);
  }),

  // [DELETE] 작품 삭제
  http.delete(`${API_URL}/admin/arts/:artsNo`, async ({ params }) => {
    const index = arts.findIndex((a) => a.artsNo === Number(params.artsNo));
    if (index !== -1) arts.splice(index, 1);
    return HttpResponse.json({ message: '삭제 성공' });
  }),
];
