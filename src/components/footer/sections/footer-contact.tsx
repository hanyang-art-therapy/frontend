import { FOOTER_CONTACT } from '@/constants/footer';

export default function Contact() {
  const { EMAIL, TEL, SNS } = FOOTER_CONTACT;

  return (
    <>
      <div className='w-full flex justify-center border-t border-t-[#aaa]'>
        <div className='w-full md:max-w-[1080px] py-[15px] px-[20px] md:px-0 flex justify-between md:items-center flex-col md:flex-row gap-[30px] md:gap-auto title-b-16'>
          <ul className='flex gap-[10px] md:gap-[30px] flex-col md:flex-row text-black '>
            <li>
              <label className='text-primary'>{EMAIL.label} </label>
              <a href={EMAIL.href} className='hover:opacity-70'>
                {EMAIL.value}
              </a>
            </li>

            <li>
              <label className='text-primary'>{TEL.label} </label>
              <a href={TEL.href} className='hover:opacity-70'>
                {TEL.value}
              </a>
            </li>
          </ul>

          <ul className='flex items-center gap-[15px] justify-end'>
            <li><label className='text-primary'>{SNS.label}</label></li>
            <li>
              <a
                href={SNS.INSTAGRAM.href}
                target='_blank'
                className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-primary hover:opacity-70'
                aria-label={SNS.INSTAGRAM.label}>
                <img src={SNS.INSTAGRAM.icon} alt={SNS.INSTAGRAM.alt} />
              </a>
            </li>
            <li>
              <a
                href={SNS.NAVER_BLOG.href}
                target='_blank'
                className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-primary hover:opacity-70'
                aria-label={SNS.NAVER_BLOG.label}>
                <img src={SNS.NAVER_BLOG.icon} alt={SNS.NAVER_BLOG.alt} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
