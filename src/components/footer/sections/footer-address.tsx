import { FOOTER_ADDRESS } from '@/constants/footer';

export default function Address() {
  const { manager, copyright } = FOOTER_ADDRESS;

  return (
    <>
      <div className='w-full flex justify-center border-t border-t-gray'>
        <address className='w-full md:max-w-[1080px] pt-[20px] pb-[50px] md:text-r-14 text-[10px] not-italic leading-[24px] text-muted'>
          홈페이지 책임자 : {manager.responsible} / 홈페이지 관리자 :{' '}
          {manager.admin} / 홈페이지 담당자 : {manager.contact}
          <br />
          {copyright}
        </address>
      </div>
    </>
  );
}
