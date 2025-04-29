import RootLayout from '@/layouts/root-layout';
import GalleryPage from '@/pages/gallery/page';
import Home from '@/pages/page';
import MyPage from '@/pages/my-page/page';
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
        path: '/my-page',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
