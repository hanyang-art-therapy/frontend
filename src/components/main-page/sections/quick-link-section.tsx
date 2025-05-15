import { Link } from 'react-router-dom';
import { QUICK_LINK } from '@/constants/main/quick-link';

export default function QuickLinksSection() {
  return (
    <section className='w-full flex justify-center px-[20px] xl:px-0'>
      <h3 className='blind'>바로가기 메뉴</h3>
      <ul className='quick-list'>
        {QUICK_LINK.map(({ id, icon: Icon, title, text, path, bgClass }) => {
          const isExternal = /^https?:\/\//.test(path);

          return (
            <li key={id} className='quick-style'>
              {isExternal ? (
                <a
                  href={path}
                  className={bgClass}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Icon className='icon' aria-hidden='true' />
                  <strong className='t-m-18'>{title}</strong>
                  <span className='t-r-14'>{text}</span>
                </a>
              ) : (
                <Link to={path} className={bgClass}>
                  <Icon className='icon' aria-hidden='true' />
                  <strong className='t-m-18'>{title}</strong>
                  <span className='t-r-14'>{text}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
