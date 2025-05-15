import { FOOTER_ADDRESS } from '@/constants/footer';

export default function Address() {
  const { manager, copyright } = FOOTER_ADDRESS;

  return (
    <>
      <div className='w-full flex justify-center border-t border-t-gray'>
        <address className='w-full max-w-[1260px] pt-[20px] pb-[50px] px-5 xl:px-0 flex flex-col gap-[5px] t-r-14 not-italic text-gray-9'>
          <div className='flex flex-wrap whitespace-nowrap'>
            <span className='mr-[3px]'>
              홈페이지 책임자 : {manager.responsible} /{' '}
            </span>
            <span className='mr-[3px]'>
              {' '}
              홈페이지 관리자 : {manager.admin} /{' '}
            </span>
            <span> 홈페이지 담당자 : {manager.contact}</span>
          </div>
          {copyright}
        </address>
      </div>
    </>
  );
}
