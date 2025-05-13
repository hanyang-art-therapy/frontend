import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_MENU } from '@/constants/nav';

export default function MobileMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    setOpenIndex(null);
  }, [location]);

  return (
    <div className="menu-wrapper nav-box-shadow absolute top-full left-0 w-full bg-white text-black xl:hidden z-9 open">
      <ul className="flex flex-col gap-4 p-8">
        {NAV_MENU.map((menu, index) => {
          const hasSub = menu.submenu.length > 0;
          const isOpen = openIndex === index;

          return (
            <li key={index}>
              {hasSub ? (
                <>
                  <button
                    type="button"
                    className="w-full flex justify-between items-center t-m-18"
                    onClick={() =>setOpenIndex((prev) => (prev === index ? null : index))}
                  >
                    <span>{menu.title}</span>
                    <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>

                  <ul className={`menu-wrapper mt-2 t-m-18 ${isOpen ? 'open' : ''}`}>
                    {menu.submenu.map((sub, subIndex) => (
                      <li key={subIndex} className="px-[10px] py-[8px]">
                        <Link to={sub.path}>{sub.title}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link to={menu.path} className="t-m-18 block">
                  {menu.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
