import { FOOTER_ADDRESS } from '@/constants/footer';

export default function Address() {
  const { manager, copyright, address } = FOOTER_ADDRESS;

  return (
    <>
      <div className='w-full flex justify-center border-t border-t-gray uppercase'>
        <address className='w-full max-w-[1260px] pt-5 px-5 xl:px-0 pb-[60px] flex flex-col gap-[5px] t-r-14 not-italic text-gray-9'>
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
          <div>{copyright}</div>
          <div>{address}</div>
        </address>
      </div>
    </>
  );
}
