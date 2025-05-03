import AuthLayout from '@/layouts/auth-layout';
import MyPageLayout from '@/layouts/my-page-layout';
import RootLayout from '@/layouts/root-layout';
import GalleryPage from '@/pages/gallery/page';
import SigninPage from '@/pages/signin/page';
import MyPage from '@/pages/my-page/page';
import Home from '@/pages/page';
import { createBrowserRouter } from 'react-router-dom';

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
      {
        path: '/gallery:id',
        element: <GalleryPage />,
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
