import { http, HttpResponse } from 'msw';
import type {
  PatchProfessorRequest,
  ProfessorResponse,
} from '@/types/admin/professors';

const API_URL = import.meta.env.VITE_API_URL;

// 기본 더미 3명 포함
const professors: ProfessorResponse[] = [
  {
    professorNo: 0,
    professorName: '김은진',
    position: '교수(학과주임)',
    major: '미술치료전공',
    email: 'eunjin49@hanyang.ac.kr',
    tel: '031-400-5107',
    files: {
      filesNo: 0,
      url: '/images/intro/professors/professors-01.webp',
    },
  },
  {
    professorNo: 1,
    professorName: '옥금자',
    position: '자문위원',
    major: null,
    email: null,
    tel: null,
    files: {
      filesNo: 1,
      url: '/images/intro/professors/professors-02.webp',
    },
  },
  {
    professorNo: 2,
    professorName: '김현미',
    position: '교수',
    major: '미술치료전공',
    email: 'studio505@hanyang.ac.kr',
    tel: null,
    files: {
      filesNo: 2,
      url: '/images/intro/professors/professors-03.webp',
    },
  },
];

const uploadedFiles = new Map<number, string>();
let nextFilesNo = 3;

export const adminProfessorHandlers = [
  // [POST] 교수진 등록
  http.post(`${API_URL}/admin/professors`, async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      return HttpResponse.json(
        { message: '파일 업로드 실패' },
        { status: 400 }
      );
    }

    const professorName = formData.get('professorName')?.toString() ?? '';
    const position = formData.get('position')?.toString() ?? '';
    const major = formData.get('major')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const tel = formData.get('tel')?.toString() ?? '';

    const filesNo = nextFilesNo++;
    const filename = encodeURIComponent(file.name);
    const url = `http://localhost:5173/images/example/${filename}`;

    uploadedFiles.set(filesNo, url);

    return HttpResponse.json({
      filesNo,
      url,
      message: '파일 업로드 성공',
      professorInfo: {
        professorName,
        position,
        major,
        email,
        tel,
      },
    });
  }),

  // [GET] 교수 목록 조회
  http.get(`${API_URL}/admin/professors`, async () => {
    return HttpResponse.json(professors);
  }),

  // [GET] 교수 상세 조회
  http.get(`${API_URL}/admin/professors/:professorNo`, async ({ params }) => {
    const professor = professors.find(
      (p) => p.professorNo === Number(params.professorNo)
    );
    return HttpResponse.json(professor ?? {});
  }),

  // [PATCH] 교수 수정
  http.patch(
    `${API_URL}/admin/professors/:professorNo`,
    async ({ request, params }) => {
      const updated = (await request.json()) as PatchProfessorRequest;

      const index = professors.findIndex(
        (prof) => prof.professorNo === Number(params.professorNo)
      );

      if (index !== -1) {
        const newUrl =
          uploadedFiles.get(updated.filesNo) ?? professors[index].files.url;

        professors[index] = {
          ...professors[index],
          ...updated,
          files: {
            filesNo: updated.filesNo,
            url: newUrl,
          },
        };
      }

      return HttpResponse.json(professors[index]);
    }
  ),

  // [DELETE] 교수 삭제
  http.delete(
    `${API_URL}/admin/professors/:professorNo`,
    async ({ params }) => {
      const index = professors.findIndex(
        (p) => p.professorNo === Number(params.professorNo)
      );
      if (index !== -1) professors.splice(index, 1);
      return HttpResponse.json({ message: '삭제 성공' });
    }
  ),
];
