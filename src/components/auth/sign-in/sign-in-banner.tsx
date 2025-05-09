export default function SignInBanner() {
  return (
    <div className='bg-bg-gray-fa mt-1 items-center justify-center flex w-screen'>
      <div className='flex flex-col py-[30px] px-2 md:px-0 md:py-[60px] md:max-w-[770px]'>
        <span className='t-b-16 md:t-b-32'>한양대학교 에리카</span>
        <p>
          <span className='t-b-24 md:t-b-52'>
            미술치료학과 홈페이지
          </span>
          <span className='t-b-16 md:t-b-32'>
            에 오신 것을 환영합니다.
          </span>
        </p>
        <span className='md:mt-[30px] mt-[15px] t-b-14 md:t-b-24 text-center opacity-70'>
          Hanyang University ERICA Art Therapy Home Page Service
        </span>
      </div>
    </div>
  );
}
