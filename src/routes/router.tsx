import AuthLayout from '@/layouts/auth-layout';
import MyPageLayout from '@/layouts/my-page-layout';
import RootLayout from '@/layouts/root-layout';
import GalleryPage from '@/pages/gallery/page';
import SigninPage from '@/pages/signin/page';
import MyPage from '@/pages/my-page/page';
import Home from '@/pages/page';
import { createBrowserRouter } from 'react-router-dom';
import ArtsDetail from '@/components/gallery/arts/artsdetail.tsx/artsdetail';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/gallery',
        element: <GalleryPage />,
      },
      // 갤러리 아이디 연결하여 작품설명 화면으로 넘어가게 설정하였습니다
      {
        path: '/gallery/:id',
        element: <ArtsDetail />,
      },
      {
        path: '/my-page',
        element: <MyPage />,
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: '/signin',
        element: <SigninPage />,
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
