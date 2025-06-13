import { Link } from 'react-router-dom';

export default function Logo({ subName }: { subName?: string }) {
  return (
    <h1>
      <Link to='/' className='flex items-center'>
        <img
          src='/images/logo/desktop-logo.webp'
          alt='한양대학교 에리카 미술치료학과'
          className='h-[30px] object-contain sm:block hidden'
        />

        <img
          src='/images/logo/mobile-logo.png'
          alt='한양대학교 에리카 미술치료학과'
          className='h-[30px] object-contain sm:hidden block'
        />

        {subName && (
          <p className='t-m-18 hidden md:inline mt-[2px] ml-2'>{subName}</p>
        )}
      </Link>
    </h1>
  );
}
