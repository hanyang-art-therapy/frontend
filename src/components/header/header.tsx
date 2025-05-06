import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='w-full h-[40px] pl-[20px] md:pl-0 flex justify-center mx-auto bg-white sticky top-0 z-99'>
      <div className='w-[1080px] h-full flex items-center justify-between title-b-14'>
        <div className='text-primary'>
          <Link to='/site-map' target='_blank' className='hover:opacity-70'>
            사이트맵
          </Link>
        </div>
        <div className='flex gap-5 px-5 leading-[40px] bg-bg-primary text-white'>
          <Link to='/sign-in' className='hover:opacity-70'>
            로그인
          </Link>
          <Link to='/my-page' className='hover:opacity-70'>
            마이페이지
          </Link>
        </div>
      </div>
    </header>
  );
}
