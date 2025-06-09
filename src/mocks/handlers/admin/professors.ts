import { http, HttpResponse } from 'msw';
import { ADMIN_PROFESSORS_MOCK_DATA } from '@/constants/admin/professors';
import type { PatchProfessorRequest } from '@/types/admin/professors';

const API_URL = import.meta.env.VITE_API_URL;

let professors = [...ADMIN_PROFESSORS_MOCK_DATA];

export const adminProfessorHandlers = [
  // [GET] 교수 전체 조회
  http.get(`${API_URL}/admin/professors`, async () => {
    return HttpResponse.json(professors);
  }),

  // [PATCH] 교수 정보 수정
  http.patch(
    `${API_URL}/admin/professors/:professorNo`,
    async ({ request, params }) => {
      const { professorNo } = params;
      const patch = (await request.json()) as PatchProfessorRequest;
      const idx = professors.findIndex(
        (a) => a.professorNo === Number(professorNo)
      );

      if (idx === -1) {
        return HttpResponse.json(
          { message: '해당 교수진이 존재하지 않습니다.' },
          { status: 404 }
        );
      }

      const filesNo = patch.files?.filesNo ?? professors[idx].files.filesNo;
      let url = professors[idx].files.url;
      if (typeof filesNo === 'number') {
        const found = professors.find((p) => p.files.filesNo === filesNo);
        url = found?.files.url ?? url;
      }

      professors[idx] = {
        ...professors[idx],
        ...patch,
        position: patch.position ?? professors[idx].position ?? '',
        major: patch.major ?? professors[idx].major ?? '',
        email: patch.email ?? professors[idx].email ?? '',
        tel: patch.tel ?? professors[idx].tel ?? '',
        files: {
          filesNo,
          url,
        },
      };

      return HttpResponse.json(
        { message: '교수진 수정이 완료되었습니다.' },
        { status: 200 }
      );
    }
  ),

  // [DELETE] 교수 삭제
  http.delete(
    `${API_URL}/admin/professors/:professorNo`,
    async ({ params }) => {
      const { professorNo } = params;
      const idx = professors.findIndex(
        (a) => a.professorNo === Number(professorNo)
      );

      if (idx === -1) {
        return HttpResponse.json(
          { message: '해당 교수진이 존재하지 않습니다.' },
          { status: 404 }
        );
      }

      professors.splice(idx, 1);

      return HttpResponse.json({
        status: 200,
        message: '교수진 삭제가 완료되었습니다.',
      });
    }
  ),

  // [POST] 교수 등록
  http.post(
    `${API_URL}/admin/professors`,
    async ({ request }: { request: Request }) => {
      const { professorName, position, major, email, tel, filesNo } =
        await request.json();

      const professorNo =
        professors.length > 0
          ? Math.max(...professors.map((a) => a.professorNo)) + 1
          : 1;

      let url = '/images/no-image.jpg';
      if (typeof filesNo === 'number') {
        const found = professors.find((p) => p.files.filesNo === filesNo);
        url = found?.files.url ?? '/images/no-image.jpg';
      }

      const newProfessor = {
        professorNo,
        professorName,
        position,
        major,
        email,
        tel,
        files: {
          filesNo,
          url,
        },
      };

      professors.push(newProfessor);

      return HttpResponse.json({
        status: 200,
        message: '교수진 등록이 완료되었습니다.',
      });
    }
  ),
];
