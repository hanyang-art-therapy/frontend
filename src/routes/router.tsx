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

// 임상치료
const ClinicalPage = lazy(() => import('@/pages/clinical/page'));
const DevelopmentalPage = lazy(
  () => import('@/pages/clinical/developmental/page')
);
const InfantPage = lazy(() => import('@/pages/clinical/infant/page'));
const ChildrenPage = lazy(() => import('@/pages/clinical/children/page'));
const AdolescentPage = lazy(() => import('@/pages/clinical/adolescent/page'));
const AdultPage = lazy(() => import('@/pages/clinical/adult/page'));
const PreventionPage = lazy(() => import('@/pages/clinical/prevention/page'));

// 입학안내
const FreshmanPage = lazy(() => import('@/pages/enroll/freshman/page'));
const ScholarshipPage = lazy(() => import('@/pages/enroll/scholarship/page'));

// 공지사항
const NoticePage = lazy(() => import('@/pages/notice/page'));

// 관리자
const AdminPage = lazy(() => import('@/pages/admin/page'));
const AdminArtPage = lazy(() => import('@/pages/admin/art/page'));
const AdminArtistPage = lazy(() => import('@/pages/admin/artist/page'));
const AdminGalleryPage = lazy(() => import('@/pages/admin/gallery/page'));
const AdminProfessorPage = lazy(() => import('@/pages/admin/professor/page'));
const AdminUserPage = lazy(() => import('@/pages/admin/user/page'));

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
        path: '/clinical',
        children: [
          {
            path: '',
            element: lazyElement(ClinicalPage),
          },
          {
            path: 'developmental',
            element: lazyElement(DevelopmentalPage),
          },
          {
            path: 'infant',
            element: lazyElement(InfantPage),
          },
          {
            path: 'children',
            element: lazyElement(ChildrenPage),
          },
          {
            path: 'adolescent',
            element: lazyElement(AdolescentPage),
          },
          {
            path: 'adult',
            element: lazyElement(AdultPage),
          },
          {
            path: 'prevention',
            element: lazyElement(PreventionPage),
          },
        ],
      },
      {
        path: '/enroll',
        element: lazyElement(FreshmanPage),
        children: [
          {
            path: 'freshman',
            element: lazyElement(FreshmanPage),
          },
          {
            path: 'scholarship',
            element: lazyElement(ScholarshipPage),
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
      {
        path: '/admin',
        element: lazyElement(AdminPage),
        children: [
          { path: 'art', element: lazyElement(AdminArtPage) },
          { path: 'artist', element: lazyElement(AdminArtistPage) },
          { path: 'gallery', element: lazyElement(AdminGalleryPage) },
          { path: 'professor', element: lazyElement(AdminProfessorPage) },
          { path: 'user', element: lazyElement(AdminUserPage) },
        ],
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
