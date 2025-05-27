import { http, HttpResponse } from 'msw';
import { PROFESSORS } from '@/constants/intro/professors';
import type { PatchProfessorRequest } from '@/types/admin/professor';

const API_URL = import.meta.env.VITE_API_URL;

export const adminProfessorHandlers = [
  // [POST] 교수 등록
  http.post(
    `${API_URL}/admin/professors`,
    async ({ request }: { request: Request }) => {
      const { professorName, position, major, email, tel, filesNo } =
        await request.json();

      return HttpResponse.json({
        professorNo: 1,
        professorName,
        position,
        major,
        email,
        tel,
        files: [
          {
            filesNo,
            url: 'https://placehold.co/150x250',
          },
        ],
      });
    }
  ),

  // [GET] 교수 목록 조회
  http.get(`${API_URL}/admin/professors`, async () => {
    return HttpResponse.json(PROFESSORS);
  }),

  // [GET] 교수 상세 조회
  http.get(`${API_URL}/admin/professors/:professorNo`, async ({ params }) => {
    const { professorNo } = params;

    return HttpResponse.json(
      PROFESSORS.find(
        (professor) => professor.professorNo === Number(professorNo)
      )
    );
  }),

  // [PATCH] 교수 수정
  http.patch(
    `${API_URL}/admin/professors/:professorNo`,
    async ({ request, params }) => {
      const { professorNo } = params;
      const { professorName, position, major, email, tel, filesNo } =
        (await request.json()) as PatchProfessorRequest;

      return HttpResponse.json({
        professorNo,
        professorName,
        position,
        major,
        email,
        tel,
        files: [
          {
            filesNo,
            url: 'https://placehold.co/150x250',
          },
        ],
      });
    }
  ),

  // [DELETE] 교수 삭제
  http.delete(`${API_URL}/admin/professors/:professorNo`, async () => {
    return HttpResponse.json({
      message: '',
    });
  }),
];
