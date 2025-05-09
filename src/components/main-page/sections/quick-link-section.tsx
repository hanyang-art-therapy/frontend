import { QUICK_LINK } from '@/constants/main/quick-link';

export default function QuickLinksSection() {
  return (
    <section className='w-full flex justify-center'>
      <h3 className='blind'>바로가기 메뉴</h3>
      <ul className='quick-list'>
        {QUICK_LINK.map(({ title, text, path, icon: Icon, bgClass }) => (
          <li key={`${path}/${title}`} className='quick-style'>
            <a href={path} className={bgClass}>
              <Icon className='icon'/>
              <strong className='t-b-18'>{title}</strong>
              <span className='t-r-14'>{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
