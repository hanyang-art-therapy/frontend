import SignInContent from '@/components/auth/sign-in/sign-in-content';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';

export default function SignIn() {
  const { role } = useAuthStore();

  if (role === 'ADMIN' || role === 'TESTER') {
    return <Navigate to='/admin/users' replace />;
  }

  if (role) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='min-h-screen-vh md:max-w-[380px] mx-auto pt-[60px] md:pt-[100px]'>
      <SignInContent />
    </div>
  );
}
