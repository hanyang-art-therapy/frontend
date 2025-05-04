import { Contact } from 'lucide-react';

export default function QuickLinksSection() {
  return (
    <section className='w-full flex justify-center'>
      <h3 className='blind'>바로가기 메뉴</h3>
      <ul className='w-[1080px] flex justify-between py-[60px]'>
        <li>
          <a href='#' className='quick-style'>
            <Contact className='w-[24px] h-[24px] text-black' />
            <strong>교수진 소개</strong>
            <span>자세히 보기</span>
          </a>
        </li>
        <li>
          <a href='#' className='quick-style'>
            <Contact className='w-[24px] h-[24px] text-black' />
            <strong>교수진 소개</strong>
            <span>자세히 보기</span>
          </a>
        </li>
        <li>
          <a href='#' className='quick-style'>
            <Contact className='w-[24px] h-[24px] text-black' />
            <strong>교수진 소개</strong>
            <span>자세히 보기</span>
          </a>
        </li>
        <li>
          <a href='#' className='quick-style'>
            <Contact className='w-[24px] h-[24px] text-black' />
            <strong>교수진 소개</strong>
            <span>자세히 보기</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
