import { ART_CONTENT } from '@/constants/gallery/art';
import { http, HttpResponse } from 'msw';

export const galleryHandlers = [
  http.get('/gallery/arts', async () => {
    return HttpResponse.json(ART_CONTENT, { status: 200 });
  }),

  http.get('/gallery/arts/:id', async () => {
    return HttpResponse.json(ART_CONTENT, { status: 200 });
  }),
];
