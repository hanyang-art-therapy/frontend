import { http, HttpResponse } from 'msw';
import { PROFESSORS } from '@/constants/intro/professors';
import type { PatchProfessorRequest } from '@/types/admin/professors';

const API_URL = import.meta.env.VITE_API_URL;

export const adminProfessorHandlers = [
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

      const professor = PROFESSORS.find(
        (professor) => professor.professorNo === Number(professorNo)
      );
      if (!professor) {
        return HttpResponse.json(
          { message: '해당 회원이 존재하지 않습니다.' },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        ...professor, // 기존 객체에
        ...(professorName !== undefined ? { professorName } : {}),
        ...(position !== undefined ? { position } : {}),
        ...(major !== undefined ? { major } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(tel !== undefined ? { tel } : {}),
        ...(filesNo !== undefined
          ? {
              files: [
                {
                  filesNo,
                  url: 'https://placehold.co/150x250',
                },
              ],
            }
          : {}),
      });
    }
  ),

  // [DELETE] 교수 삭제
  http.delete(`${API_URL}/admin/professors/:professorNo`, async () => {
    return HttpResponse.json({
      message: '',
    });
  }),

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
];
