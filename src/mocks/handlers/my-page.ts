import { POST_MOCK_DATA, REVIEW_MOCK_DATA } from '@/constants/my-page/my-page';
import { http, HttpResponse } from 'msw';

export const myPageHandlers = [
  http.get('/my-page/my-reviews', async () => {
    return HttpResponse.json(REVIEW_MOCK_DATA, { status: 200 });
  }),

  http.get('/my-page/my-posts', async () => {
    return HttpResponse.json(POST_MOCK_DATA, { status: 200 });
  }),
];
