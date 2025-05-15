import { http, HttpResponse } from 'msw';

type LoginRequestBody = {
  userId: string;
  password: string;
};

export const authHandlers = [
  http.post('/user/sign-in', async ({ request }) => {
    const { userId, password } = (await request.json()) as LoginRequestBody;

    if (userId === 'test' && password === 'test') {
      return HttpResponse.json(
        { accessToken: 'mock-access-token', userNo: '1' },
        {
          status: 200,
          headers: {
            'Set-Cookie':
              'refreshToken=mock-refresh; HttpOnly; Path=/; Max-Age=86400',
          },
        }
      );
    }

    return HttpResponse.json(
      { message: '아이디 또는 비밀번호가 일치하지 않습니다.' },
      { status: 404 }
    );
  }),

  http.post('/user/refresh', async () => {
    return HttpResponse.json({ accessToken: 'mock-access-token' });
  }),

  http.post('/user/sign-up', async () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  http.delete('/user/sign-out', async () => {
    return HttpResponse.json(
      { message: '로그아웃 되었습니다.' },
      { status: 200 }
    );
  }),

  http.get('/user/check-id', async ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (userId === 'test') {
      return HttpResponse.json(
        { message: '이미 사용중인 계정입니다.' },
        { status: 409 }
      );
    }

    return HttpResponse.json(true, { status: 200 });
  }),

  http.get('/user/check-studentNo', async ({ request }) => {
    const url = new URL(request.url);
    const studentNo = url.searchParams.get('studentNo');

    if (studentNo === '1010101011') {
      return HttpResponse.json(
        { message: '이미 사용중인 학번입니다.' },
        { status: 409 }
      );
    }

    return HttpResponse.json(true, { status: 200 });
  }),

  http.post('/user/check-code', async ({ request }) => {
    const { verificationCode } = (await request.json()) as {
      verificationCode: string;
    };

    if (verificationCode === '1111111111') {
      return HttpResponse.json({ message: '인증되었습니다' }, { status: 200 });
    }

    return HttpResponse.json(
      { message: '입력값이 올바르지 않습니다.' },
      { status: 400 }
    );
  }),

  http.post('/user/check-email', async ({ request }) => {
    const { email } = (await request.json()) as { email: string };

    if (email === 'test@test.com') {
      return HttpResponse.json(
        { message: '이미 사용중인 이메일입니다.' },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      { message: '확인 이메일이 발송되었습니다.' },
      { status: 200 }
    );
  }),
];
