import { NOTICE_MOCK_DATA } from '@/constants/notice/notice';
import { http, HttpResponse } from 'msw';

const API_URL = import.meta.env.VITE_API_URL;

export const noticeHandlers = [
  // GET 공지사항 전체 조회
  http.get(`${API_URL}/notices`, async ({ request }) => {
    const url = new URL(request.url);
    const size = 10;

    const page = url.searchParams.get('page')
      ? Number(url.searchParams.get('page'))
      : 0;
    const keyword = url.searchParams.get('keyword') || '';

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const filteredData = NOTICE_MOCK_DATA.content.filter(
      (notice) =>
        notice.title.includes(keyword) || notice.content.includes(keyword)
    );

    const paginatedData = filteredData.slice(startIndex, endIndex);
    const isLast = endIndex * size >= filteredData.length;

    return HttpResponse.json(
      {
        content: paginatedData,
        isLast,
      },
      { status: 200 }
    );
  }),

  // GET 공지사항 상세 조회
  http.get(`${API_URL}/notices/:noticeNo`, async ({ params }) => {
    const noticeNo = params.noticeNo;

    const notice = NOTICE_MOCK_DATA.content.find(
      (notice) => notice.noticeNo === Number(noticeNo)
    );

    if (!notice) {
      return HttpResponse.json(
        { message: '해당 게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        notice,
        file: {
          filesNo: [101],
          name: 'file.png',
          url: 'https://placehold.co/400',
        },
      },
      { status: 200 }
    );
  }),
];

// POST [관리자만 가능] 공지 등록
http.post(`${API_URL}/notices`, async ({ request }: { request: Request }) => {
  const { category, title, content, filesNo } = await request.json();

  if (!(title && content)) {
    return HttpResponse.json(
      { message: '제목과 내용은 필수 입력 항목입니다.' },
      { status: 400 }
    );
  }

  return HttpResponse.json({
    status: 201,
    message: '등록이 완료되었습니다.',
    data: {
      ...NOTICE_MOCK_DATA.content[0],
      category,
      title,
      content,
      filesNo,
    },
  });
});

// PATCH [관리자만 가능] 공지 수정
http.patch(`${API_URL}/notices/:noticeNo`, async ({ params }) => {
  const noticeNo = params.noticeNo;

  if (!noticeNo) {
    return HttpResponse.json(
      { message: '해당 게시글을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  return HttpResponse.json(
    { message: '게시글 수정이 완료되었습니다.' },
    { status: 200 }
  );
});

// DELETE [관리자만 가능] 공지 삭제
http.delete(`${API_URL}/notices/:noticeNo`, async ({ params }) => {
  const noticeNo = params.noticeNo;

  if (!noticeNo) {
    return HttpResponse.json(
      { message: '해당 게시글을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  return HttpResponse.json(
    { message: '게시글 삭제가 완료되었습니다.' },
    { status: 200 }
  );
});
