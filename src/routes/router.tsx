import AuthLayout from '@/layouts/auth-layout';
import MyPageLayout from '@/layouts/my-page-layout';
import RootLayout from '@/layouts/root-layout';
import SignInPage from '@/pages/(auth)/sign-in/page';
import SignUpPage from '@/pages/(auth)/sign-up/page';
import FindMyPage from '@/pages/(auth)/find-my/page';
import GalleryPage from '@/pages/gallery/page'; // <-- 이 컴포넌트 내부는 <Outlet />만 써야 함
import MyPage from '@/pages/my-page/page';
import Home from '@/pages/page';
import Professors from '@/components/info-professors/professors';
import Certificates from '@/components/info-certificates/certificates';
import { createBrowserRouter } from 'react-router-dom';
import ArtsDetail from '@/components/gallery/arts/art-detail';
import Exhibition from '@/components/gallery/exhibition/exhibition';
import Arts from '@/components/gallery/arts/arts';
import UnderConstructionPage from '@/components/404/under-construction-page';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/404',
        element: <UnderConstructionPage />,
      },
      {
        path: '/gallery',
        element: <GalleryPage />,
        children: [
          {
            index: true,
            element: <Arts />,
          },
          {
            path: 'exhibition',
            element: <Exhibition />,
          },
          {
            path: 'arts',
            element: <Arts />,
          },
          {
            path: ':artsNo',
            element: <ArtsDetail />,
          },
        ],
      },
      {
        path: '/my-page',
        element: <MyPage />,
      },
      {
        path: '/professors',
        element: <Professors />,
      },
      {
        path: '/certificatess',
        element: <Certificates />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/find-my',
        element: <FindMyPage />,
      },
    ],
  },
  {
    element: <MyPageLayout />,
    children: [
      {
        path: '/my-page',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
