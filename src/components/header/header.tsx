import { Link } from 'react-router-dom';
import AuthLinks from '@/components/header/links/auth-links';

export default function Header() {
  return (
    <header className='w-full h-[40px] justify-center mx-auto bg-white sticky top-0 z-10 hidden xl:flex'>
      <div className='w-full max-w-[1260px] h-full pl-[20px] xl:pl-0 flex items-center justify-between'>
        <div className='text-primary t-m-16'>
          <Link to='/admin' className='hover:opacity-70'>
            사이트맵
          </Link>
        </div>
        <AuthLinks />
      </div>
    </header>
  );
}
