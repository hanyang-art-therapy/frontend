import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='w-full h-[40px] flex justify-center mx-auto bg-white sticky top-0 z-99'>
      <div className='w-full max-w-[1260px] h-full pl-[20px] xl:pl-0 flex items-center justify-between'>
        <div className='text-primary t-b-16'>
          <Link to='/site-map' target='_blank' className='hover:opacity-70'>
            사이트맵
          </Link>
        </div>
        <div className='flex gap-5 px-5 leading-[40px] bg-bg-primary text-white t-m-16'>
          <Link to='/sign-in' className='hover:opacity-70'>
            로그인
          </Link>
          <Link to='/sign-up' className='hover:opacity-70'>
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}
