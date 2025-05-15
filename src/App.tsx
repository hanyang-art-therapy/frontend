import router from '@/routes/router';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeAuth } from '@/apis/auth/init-auth';

export default function App() {
  useEffect(() => {
    initializeAuth();
  }, []);

  return <RouterProvider router={router} />;
}
