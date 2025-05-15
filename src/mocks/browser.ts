import { setupWorker } from 'msw/browser';
import { authHandlers } from '@/mocks/handlers/auth';
import { myPageHandlers } from '@/mocks/handlers/my-page';
import { findMyHandlers } from '@/mocks/handlers/find-my';
import { galleryHandlers } from '@/mocks/handlers/gallery';

export const worker = setupWorker(
  ...authHandlers,
  ...myPageHandlers,
  ...findMyHandlers,
  ...galleryHandlers
);
