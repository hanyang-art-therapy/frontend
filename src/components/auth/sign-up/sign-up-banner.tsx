export default function SignUpBanner() {
  return (
    <div className='py-[30px] md:py-[60px] flex items-center justify-center bg-bg-gray-fa w-screen'>
      <div className='w-full max-w-[1260px] flex flex-col items-center gap-[15px] md:gap-[30px] px-5 xl:px-0'>
        <div>
          <p>
            <span className='t-m-32 mr-1'>한양대학교 ERICA</span>
            <span className='t-m-24 whitespace-nowrap'>융합산업대학원</span>
          </p>
          <p>
            <strong className='t-b-52 whitespace-nowrap'>
              미술치료학과 홈페이지
            </strong>
            <span className='t-b-32'>에 오신 것을 환영합니다.</span>
          </p>
        </div>
        <p className='flex flex-wrap md:gap-[5px] t-m-18 text-center opacity-70'>
          <span className='whitespace-nowrap'>Hanyang University ERICA</span>
          <span className='whitespace-nowrap'>
            Art Therapy Home Page Service
          </span>
        </p>
      </div>
    </div>
  );
}
