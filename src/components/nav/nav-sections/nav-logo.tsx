type LogoProps = {
  subName?: string;
};

export default function Logo({ subName }: LogoProps) {
  return (
    <h1>
      <a href='/'>
        <img
          src='/images/logo.webp'
          alt='한양대학교 에리카 미술치료학과'
          className='min-w-[220px] h-[30px] object-contain'
        />

        {subName && <p className='text-r-14'>{subName}</p>}
      </a>
    </h1>
  );
}
