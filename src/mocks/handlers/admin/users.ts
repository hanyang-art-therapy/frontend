import { http, HttpResponse } from 'msw';
import { ADMIN_USERS_MOCK_DATA } from '@/constants/admin/users';
import { PatchUserRequest } from '@/types/admin/users';

const API_URL = import.meta.env.VITE_API_URL;

let users = [...ADMIN_USERS_MOCK_DATA];

export const adminUsersHandlers = [
  // [GET] 전체 회원 조회
  http.get(`${API_URL}/admin/users`, () => {
    return HttpResponse.json(users);
  }),

  // [PATCH] 회원 정보 수정
  http.patch(`${API_URL}/admin/users/:userNo`, async ({ params, request }) => {
    const { userNo } = params;
    const patch = (await request.json()) as PatchUserRequest;

    const idx = users.findIndex((u) => u.userNo === Number(userNo));
    if (idx === -1) {
      return HttpResponse.json(
        { message: '해당 회원이 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    users[idx] = {
      ...users[idx],
      ...patch,
    };

    return HttpResponse.json(users[idx]);
  }),
];
