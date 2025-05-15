import { http, HttpResponse } from 'msw';
import { FindIdRequest } from '@/types/find-my';

export const findMyHandlers = [
  http.post('/user/find-id', async ({ request }) => {
    const { email, userName } = (await request.json()) as FindIdRequest;

    if (email === userName) {
      return HttpResponse.json(
        { message: '일치하는 계정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ message: 'dwf***' }, { status: 200 });
  }),

  http.post('/user/find-password', async () => {
    return HttpResponse.json(
      { message: '임시 비밀번호를 전송하였습니다.' },
      { status: 200 }
    );
  }),

  http.post('/user/reset-password', async () => {
    return HttpResponse.json(
      { message: '비밀번호가 성공적으로 변경되었습니다.' },
      { status: 200 }
    );
  }),
];
