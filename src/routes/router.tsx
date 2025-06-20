import lazyElement from '@/components/common/lazy-element';
import MainSkeleton from '@/components/main/main-skeleton';
import MyPageSkeleton from '@/components/my-page/ui/my-page-skeleton';
import { AuthLayout, IntroLayout, MyPageLayout, RootLayout } from '@/layouts';
import CommingSoon from '@/pages/comming-soon/page';
import NotFoundPage from '@/pages/not-found/page';
import {
  adminArtistLoader,
  adminArtsLoader,
  adminUserLoader,
} from '@/routes/loaders/admin';
import { artLoader } from '@/routes/loaders/art/art-loader';
import { galleryLoader } from '@/routes/loaders/gallery/gallery-loader';
import { homeLoader } from '@/routes/loaders/home/home-loader';
import {
  myPageLoader,
  myPostsLoader,
  myProfileLoader,
  myReviewsLoader,
} from '@/routes/loaders/my-page';
import { rootLoader } from '@/routes/loaders/root-loader';
import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { introProfessorLoader } from './loaders/intro/professor-loader';

const HomePage = lazy(() => import('@/pages/page'));
const GalleryPage = lazy(() => import('@/pages/gallery/page'));
const ArtsDetailPage = lazy(() => import('@/pages/gallery/[arts-no]/page'));
const FindMyPage = lazy(() => import('@/pages/(auth)/find-my/page'));
const SignInPage = lazy(() => import('@/pages/(auth)/sign-in/page'));
const SignUpPage = lazy(() => import('@/pages/(auth)/sign-up/page'));
const ResetPwPage = lazy(() => import('@/pages/my-page/reset-pw/page'));
const MyPageReviews = lazy(() => import('@/pages/my-page/reviews/page'));
const MyPagePosts = lazy(() => import('@/pages/my-page/posts/page'));
const MyPageProfile = lazy(() => import('@/pages/my-page/profile/page'));
const SitemapPage = lazy(() => import('@/pages/sitemap/page'));

const IntroPage = lazy(() => import('@/pages/intro/page'));
const VisionPage = lazy(() => import('@/pages/intro/vision/page'));
const ProfessorsPage = lazy(() => import('@/pages/intro/professors/page'));
const CertificatesPage = lazy(() => import('@/pages/intro/certificates/page'));
const CurriculumsPage = lazy(() => import('@/pages/intro/curriculums/page'));
const MapPage = lazy(() => import('@/pages/intro/map/page'));
const ProspectPage = lazy(() => import('@/pages/intro/prospect/page'));
const MouPage = lazy(() => import('@/pages/intro/mou/page'));

const ClinicalPage = lazy(() => import('@/pages/clinical/page'));
const DevelopmentalPage = lazy(
  () => import('@/pages/clinical/developmental/page')
);
const InfantPage = lazy(() => import('@/pages/clinical/infant/page'));
const ChildrenPage = lazy(() => import('@/pages/clinical/children/page'));
const AdolescentPage = lazy(() => import('@/pages/clinical/adolescent/page'));
const AdultPage = lazy(() => import('@/pages/clinical/adult/page'));
const PreventionPage = lazy(() => import('@/pages/clinical/prevention/page'));

const FreshmanPage = lazy(() => import('@/pages/enroll/freshman/page'));
const ScholarshipPage = lazy(() => import('@/pages/enroll/scholarship/page'));

const NoticePage = lazy(() => import('@/pages/notice/page'));
const NoticeDetailPage = lazy(() => import('@/pages/notice/detail/page'));
const NoticeEditPage = lazy(() => import('@/pages/notice/edit/page'));
const NoticeWritePage = lazy(() => import('@/pages/notice/write/page'));

const AdminPage = lazy(() => import('@/pages/admin/page'));
const AdminUsersPage = lazy(() => import('@/pages/admin/users/page'));
const AdminArtPage = lazy(() => import('@/pages/admin/arts/page'));
const AdminArtistPage = lazy(() => import('@/pages/admin/artists/page'));
const AdminGalleryPage = lazy(() => import('@/pages/admin/galleries/page'));
const AdminProfessorPage = lazy(() => import('@/pages/admin/professors/page'));

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
        loader: homeLoader,
      },
      {
        path: '/gallery',
        element: lazyElement({ Element: GalleryPage }),
        loader: galleryLoader,
      },
      {
        path: '/gallery/:artsNo',
        element: lazyElement({ Element: ArtsDetailPage }),
        loader: artLoader,
      },

      {
        path: '/clinical',
        children: [
          {
            path: '',
            element: lazyElement({ Element: ClinicalPage }),
          },
          {
            path: 'developmental',
            element: lazyElement({ Element: DevelopmentalPage }),
          },
          {
            path: 'infant',
            element: lazyElement({ Element: InfantPage }),
          },
          {
            path: 'children',
            element: lazyElement({ Element: ChildrenPage }),
          },
          {
            path: 'adolescent',
            element: lazyElement({ Element: AdolescentPage }),
          },
          {
            path: 'adult',
            element: lazyElement({ Element: AdultPage }),
          },
          {
            path: 'prevention',
            element: lazyElement({ Element: PreventionPage }),
          },
        ],
      },
      {
        path: '/enroll',
        children: [
          {
            path: 'freshman',
            element: lazyElement({ Element: FreshmanPage }),
          },
          {
            path: 'scholarship',
            element: lazyElement({ Element: ScholarshipPage }),
          },
        ],
      },
      {
        path: '/notice',
        element: lazyElement({ Element: NoticePage }),
      },
      {
        path: 'notice/:noticeNo',
        element: lazyElement({ Element: NoticeDetailPage }),
      },
      {
        path: 'notice/:noticeNo/edit',
        element: lazyElement({ Element: NoticeEditPage }),
      },
      {
        path: 'notice/write',
        element: lazyElement({ Element: NoticeWritePage }),
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
        element: <AdminPage />,
        children: [
          {
            path: 'users',
            element: lazyElement({ Element: AdminUsersPage }),
            loader: adminUserLoader,
          },
          {
            path: 'arts',
            element: lazyElement({ Element: AdminArtPage }),
            loader: adminArtsLoader,
          },
          {
            path: 'artists',
            element: lazyElement({ Element: AdminArtistPage }),
            loader: adminArtistLoader,
          },
          {
            path: 'galleries',
            element: lazyElement({ Element: AdminGalleryPage }),
          },
          {
            path: 'professors',
            element: lazyElement({ Element: AdminProfessorPage }),
          },
        ],
      },
      {
        path: '/sitemap',
        element: lazyElement({ Element: SitemapPage }),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: lazyElement({ Element: SignInPage }),
      },
      {
        path: '/sign-up',
        element: lazyElement({ Element: SignUpPage }),
      },
      {
        path: '/find-my',
        element: lazyElement({ Element: FindMyPage }),
      },
    ],
  },
  {
    element: <MyPageLayout />,
    loader: myPageLoader,
    children: [
      {
        path: '/my-page',
        children: [
          {
            path: 'reviews',
            element: lazyElement({
              Element: MyPageReviews,
              fallback: <MyPageSkeleton />,
            }),
            loader: myReviewsLoader,
          },
          {
            path: 'posts',
            element: lazyElement({
              Element: MyPagePosts,
              fallback: <MyPageSkeleton />,
            }),
            loader: myPostsLoader,
          },
          {
            path: 'profile',
            children: [
              {
                path: '',
                element: lazyElement({
                  Element: MyPageProfile,
                  fallback: <MyPageSkeleton />,
                }),
                loader: myProfileLoader,
              },
              {
                path: 'reset-pw',
                element: lazyElement({
                  Element: ResetPwPage,
                  fallback: <MyPageSkeleton />,
                }),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <IntroLayout />,
    children: [
      {
        path: '/intro',
        children: [
          {
            path: '',
            element: lazyElement({ Element: IntroPage }),
          },
          {
            path: 'vision',
            element: lazyElement({ Element: VisionPage }),
          },
          {
            path: 'professors',
            element: lazyElement({ Element: ProfessorsPage }),
            loader: introProfessorLoader,
          },
          {
            path: 'curriculums',
            element: lazyElement({ Element: CurriculumsPage }),
          },
          {
            path: 'certificates',
            element: lazyElement({ Element: CertificatesPage }),
          },
          {
            path: 'prospect',
            element: lazyElement({ Element: ProspectPage }),
          },
          {
            path: 'mou',
            element: lazyElement({ Element: MouPage }),
          },
          {
            path: 'map',
            element: lazyElement({ Element: MapPage }),
          },
        ],
      },
    ],
  },
]);

export default router;
