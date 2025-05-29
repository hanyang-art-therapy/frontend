import type { SignInRequest } from '@/types/auth/sign-in';
import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

export const authHandlers = [
  // POST 로그인
  http.post(`${API_URL}/user/sign-in`, async ({ request }) => {
    const { userId, password } = (await request.json()) as SignInRequest;

    if (userId === 'test' && password === 'test') {
      return HttpResponse.json(
        {
          accessToken: 'mock-access-token',
          userNo: '1',
          role: 'USER',
        },
        {
          status: 200,
          headers: {
            'Set-Cookie':
              'refreshToken=mock-refresh; HttpOnly; Path=/; Max-Age=86400',
          },
        }
      );
    }

    if (userId === 'admin' && password === 'admin') {
      return HttpResponse.json(
        {
          accessToken: 'mock-access-token',
          userNo: '0',
          role: 'ADMIN',
        },
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

  // POST REFRESH 토큰 갱신
  http.post(`${API_URL}/user/refresh`, async () => {}),

  // POST 회원가입
  http.post(`${API_URL}/user/sign-up`, async () => {
    return HttpResponse.json({}, { status: 200 });
  }),

  // DELETE 로그아웃
  http.delete(`${API_URL}/user/sign-out`, async () => {
    return HttpResponse.json(
      { message: '로그아웃 되었습니다.' },
      { status: 200 }
    );
  }),

  // GET 아이디 중복 검사
  http.get(`${API_URL}/user/check-id`, async ({ request }) => {
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

  // GET 학번 중복 검사
  http.get(`${API_URL}/user/check-studentNo`, async ({ request }) => {
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

  // POST 이메일 인증 (이메일 중복 검사)
  http.post(
    `${API_URL}/user/check-email`,
    async ({ request }: { request: Request }) => {
      const req = await request.json();

      if (req.email === 'test@hanyang.ac.kr') {
        return HttpResponse.json(
          { message: '이미 사용중인 이메일입니다.' },
          { status: 409 }
        );
      }

      return HttpResponse.json(
        { message: '기재하신 이메일 주소로 인증번호가 발송되었습니다.' },
        { status: 200 }
      );
    }
  ),

  // POST 이메일 인증 (인증 번호 확인)
  http.post(
    `${API_URL}/user/check-code`,
    async ({ request }: { request: Request }) => {
      const req = await request.json();

      if (req.verificationCode === 'test') {
        return HttpResponse.json(
          { message: '인증되었습니다' },
          { status: 200 }
        );
      }

      return HttpResponse.json(
        { message: '인증값이 올바르지 않습니다.' },
        { status: 400 }
      );
    }
  ),
];
