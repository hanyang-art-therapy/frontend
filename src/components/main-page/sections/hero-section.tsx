export default function HeroSection() {
  return (
    <section className='w-full h-[400px] flex justify-center relative banner-bg'>
      <div className='w-full h-full inset-0 bg-black/10 absolute'></div>
      <div className='w-full max-w-[1260px] h-full flex flex-col justify-center items-center text-shadow-style relative'>
        <div className='xl:pl-0 pl-[20px] flex flex-col absolute top-[90px] left-0'>
          <p className='flex gap-[10px] items-center'>
            <span className='t-m-32'>한양대학교 ERICA</span>
            <span className='t-m-24'>융합산업대학원</span>
          </p>
          <h2 className='flex flex-col'>
            <span className='t-b-52'>미술치료학과</span>
            <span className='t-m-32'>DEPARTMENT OF ART THERAPY</span>
          </h2>
        </div>
        <p className='xl:px-0 px-[20px] t-r-18 sm:text-right leading-[24px] lg:leading-[32px] absolute bottom-[40px] right-0'>
          미술작품을 활용한 전문적인 미술치료전문가 양성, 심리치료의 도구로 이미지와 창조가 반영되는<br className="hidden sm:block"/>
          미술활동과 미술작품을 활용하여 인격의 통합과 재통합을 돕는 미술치료전문가를 양성합니다.
        </p>
      </div>
    </section>
  );
}
