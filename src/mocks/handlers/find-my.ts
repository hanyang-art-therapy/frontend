import { http, HttpResponse } from 'msw';
import type {
  FindIdRequest,
  FindPasswordRequest,
  ResetPasswordRequest,
} from '@/types/find-my';

export const findMyHandlers = [
  // POST 아이디 찾기
  http.post('/user/find-id', async ({ request }) => {
    const { email, userName } = (await request.json()) as FindIdRequest;

    if (email === 'test@test.com' && userName === 'test') {
      return HttpResponse.json({ message: 'dwf***' }, { status: 200 });
    }

    return HttpResponse.json(
      { message: '일치하는 계정을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }),

  // POST 비밀번호 찾기
  http.post('/user/find-password', async ({ request }) => {
    const { userId, email } = (await request.json()) as FindPasswordRequest;

    if (userId === 'test' && email === 'test@test.com') {
      return HttpResponse.json(
        { message: '임시 비밀번호를 전송하였습니다.' },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: '일치하는 계정을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }),

  // POST 비밀번호 재설정
  http.post('/user/reset-password', async ({ request }) => {
    const { userId, currentPassword, newPassword } =
      (await request.json()) as ResetPasswordRequest;

    if (newPassword && userId === currentPassword) {
      return HttpResponse.json(
        { message: '비밀번호가 성공적으로 변경되었습니다.' },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: '비밀번호가 일치하지 않습니다.' },
      { status: 400 }
    );
  }),
];
