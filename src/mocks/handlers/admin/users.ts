import { http, HttpResponse } from 'msw';
import { ADMIN_USERS_MOCK_DATA } from '@/constants/admin/users';
import { PatchUserRequest } from '@/types/admin/users';

const API_URL = import.meta.env.VITE_API_URL;

export const adminUsersHandlers = [
  // [GET] 전체 회원 조회
  http.get(`${API_URL}/admin/users`, async () => {
    return HttpResponse.json(ADMIN_USERS_MOCK_DATA);
  }),

  // [GET] 회원 상세 조회
  http.get(`${API_URL}/admin/users/:userNo`, async ({ params }) => {
    const { userNo } = params;
    const user = ADMIN_USERS_MOCK_DATA.find((u) => u.userNo === Number(userNo));
    if (!user) {
      return HttpResponse.json(
        { message: '해당 회원이 존재하지 않습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json(user);
  }),

  // [PATCH] 회원 정보 수정
  http.patch(`${API_URL}/admin/users/:userNo`, async ({ params, request }) => {
    const { userNo } = params;
    const { userId, userName, email, studentNo, role, userStatus } =
      (await request.json()) as PatchUserRequest;

    const users = ADMIN_USERS_MOCK_DATA.find(
      (users) => users.userNo === Number(userNo)
    );
    if (!users) {
      return HttpResponse.json(
        { message: '해당 회원이 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      ...users,
      ...(userId !== undefined ? { userId } : {}),
      ...(userName !== undefined ? { userName } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(studentNo !== undefined ? { studentNo } : {}),
      ...(role !== undefined ? { role } : {}),
      ...(userStatus !== undefined ? { userStatus } : {}),
    });
  }),
];
