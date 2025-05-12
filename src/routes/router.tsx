import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout, RootLayout } from '@/layouts';
import NotFoundPage from '@/pages/not-found/page';
import lazyElement from '@/components/common/lazy-element';
import MainSkeleton from '@/components/main-page/main-skeleton';

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

const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
      },
      {
        path: '/gallery/:artsNo',
        element: lazyElement(ArtsDetailPage),
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
