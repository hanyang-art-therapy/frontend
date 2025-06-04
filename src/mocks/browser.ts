import { setupWorker } from 'msw/browser';
import { authHandlers } from '@/mocks/handlers/auth';
import { myPageHandlers } from '@/mocks/handlers/my-page';
import { findMyHandlers } from '@/mocks/handlers/find-my';
import { galleryHandlers } from '@/mocks/handlers/gallery';
import { adminArtistHandlers } from '@/mocks/handlers/admin/artist';
import { adminProfessorHandlers } from '@/mocks/handlers/admin/professors';

export const worker = setupWorker(
  ...authHandlers,
  ...myPageHandlers,
  ...findMyHandlers,
  ...galleryHandlers,
  ...adminArtistHandlers,
  ...adminProfessorHandlers
);
