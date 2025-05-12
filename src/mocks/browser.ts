import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth';
import { myPageHandlers } from './handlers/my-page';
import { findMyHandlers } from './handlers/find-my';

export const worker = setupWorker(
  ...authHandlers,
  ...myPageHandlers,
  ...findMyHandlers
);
