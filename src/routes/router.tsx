import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import lazyElement from '@/components/common/lazy-element';
import MainSkeleton from '@/components/main/main-skeleton';
import { AuthLayout, RootLayout } from '@/layouts';
import CommingSoon from '@/pages/comming-soon/page';
import NotFoundPage from '@/pages/not-found/page';
import { rootLoader } from '@/routes/loaders/root-loader';
// import { artLoader } from '@/routes/loaders/art-loader';

// LAZY LOADING
const HomePage = lazy(() => import('@/pages/page'));
const GalleryPage = lazy(() => import('@/pages/gallery/page'));
const ArtsDetailPage = lazy(() => import('@/pages/gallery/[arts-no]/page'));
const FindMyPage = lazy(() => import('@/pages/(auth)/find-my/page'));
const SignInPage = lazy(() => import('@/pages/(auth)/sign-in/page'));
const SignUpPage = lazy(() => import('@/pages/(auth)/sign-up/page'));
const MyPage = lazy(() => import('@/pages/my-page/page'));
const ProfessorsPage = lazy(() => import('@/pages/intro/professors/page'));
const CertificatesPage = lazy(() => import('@/pages/intro/certificates/page'));
const ResetPwPage = lazy(() => import('@/pages/my-page/reset-pw/page'));
const NoticePage = lazy(() => import('@/pages/notice/page'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<MainSkeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/gallery',
        element: lazyElement(GalleryPage),
        // loader: galleryLoader,
      },
      {
        path: '/gallery/:artsNo',
        element: lazyElement(ArtsDetailPage),
        // loader: artLoader,
      },
      {
        path: '/my-page',
        children: [
          {
            path: '',
            element: lazyElement(MyPage),
          },
          {
            path: 'reset-pw',
            element: lazyElement(ResetPwPage),
          },
        ],
      },
      {
        path: '/intro',
        children: [
          {
            path: 'professors',
            element: lazyElement(ProfessorsPage),
          },
          {
            path: 'certificates',
            element: lazyElement(CertificatesPage),
          },
        ],
      },
      {
        path: '/notice',
        element: lazyElement(NoticePage),
      },
      {
        path: '/comming-soon',
        element: <CommingSoon />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: lazyElement(SignInPage),
      },
      {
        path: '/sign-up',
        element: lazyElement(SignUpPage),
      },
      {
        path: '/find-my',
        element: lazyElement(FindMyPage),
      },
    ],
  },
]);

export default router;
