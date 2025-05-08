import { QUICK_LINK } from '@/constants/main/quick-link';

export default function QuickLinksSection() {
  return (
    <section className='w-full flex justify-center'>
      <h3 className='blind'>바로가기 메뉴</h3>
      <ul className='w-[1080px] flex justify-between py-[60px]'>
        {QUICK_LINK.map(({ title, path, icon: Icon, bgClass }) => (
          <li key={`${path}/${title}`}>
            <a href={path} className={`quick-style ${bgClass}`}>
              <Icon className='w-[50px] h-[50px]' />
              <strong className='title-b-24 mb-[5px]'>{title}</strong>
              <span className='border border-white py-[6px] px-[8px] text-r-14'>
                자세히보기
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
