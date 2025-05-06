import AuthLayout from '@/layouts/auth-layout';
import RootLayout from '@/layouts/root-layout';
import NotFound from '@/pages/not-found/page';
import SignInPage from '@/pages/(auth)/sign-in/page';
import SignUpPage from '@/pages/(auth)/sign-up/page';
import FindMyPage from '@/pages/(auth)/find-my/page';
import GalleryPage from '@/pages/gallery/page';
import MyPage from '@/pages/my-page/page';
import Home from '@/pages/page';
import { createBrowserRouter } from 'react-router-dom';
import ArtsDetail from '@/components/gallery/arts/art-detail';

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
        path: '/gallery/:artsNo',
        element: <ArtsDetail />,
      },
      {
        path: '/my-page',
        element: <MyPage />,
      },
      {
        path: '*',
        element: <NotFound />,
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
]);

export default router;
