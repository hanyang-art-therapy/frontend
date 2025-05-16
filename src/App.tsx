import router from '@/routes/router';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserId } from '@/apis/auth/init-auth';

export default function App() {
  useEffect(() => {
    getUserId();
  }, []);

  return <RouterProvider router={router} />;
}
