import Logo from '@/components/ui/logo';
import { useLocation } from 'react-router-dom';

export default function AuthHeader() {
  const location = useLocation();

  if (location.pathname === '/signin') {
    return <Logo subName='로그인' />;
  }

  return <Logo subName='회원가입' />;
}
