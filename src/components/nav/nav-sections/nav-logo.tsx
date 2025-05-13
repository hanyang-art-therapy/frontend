import { Link } from 'react-router-dom';

export default function Logo({ subName }: { subName?: string }) {
  return (
    <h1>
      <Link to='/' className='flex items-center'>
        <img
          src='/images/logo.webp'
          alt='한양대학교 에리카 미술치료학과'
          className='min-w-[210px] h-[30px] object-contain'
        />

        {subName && <p className='t-b-18 hidden md:inline'>{subName}</p>}
      </Link>
    </h1>
  );
}
