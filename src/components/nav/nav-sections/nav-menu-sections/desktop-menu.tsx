import { Link } from 'react-router-dom';
import { NAV_MENU } from '@/constants/nav';

export default function DesktopMenu() {
  return (
    <ul className='flex gap-[30px] relative'>
      {NAV_MENU.map((menu, index) => {
        const hasSub = menu.submenu?.length > 0;

        return (
          <li key={index} className='relative group'>
            <Link to={menu.path} className='main-menu'>
              {menu.title}
            </Link>

            {hasSub && (
              <ul className='sub-menu t-r-16 group-hover:block'>
                {menu.submenu.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link to={sub.path}>{sub.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
