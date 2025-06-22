import { Button } from '@/components/ui/button';
import type { NavMenu } from '@/constants/nav';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type MobileMenuItemProps = {
  menu: NavMenu;
  index: number;
  openIndex: number | null;
  setOpenIndex: Dispatch<SetStateAction<number | null>>;
};

export default function MobileMenuItem({
  menu,
  index,
  openIndex,
  setOpenIndex,
}: MobileMenuItemProps) {
  const hasSub = menu.submenu?.length > 0;
  const isOpen = openIndex === index;

  if (!hasSub)
    return (
      <Link to={menu.path} className='t-m-18 block'>
        {menu.title}
      </Link>
    );

  return (
    <li>
      <Button
        type='button'
        variant='ghost'
        className='w-full flex justify-between items-center t-m-18 cursor-pointer hover:bg-transparent py-0 h-auto'
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        <span className={cn(isOpen && 'text-primary')}>{menu.title}</span>
        <span
          className={cn(
            'transition-transform duration-300',
            isOpen && 'rotate-180 text-primary'
          )}
        >
          <ChevronDown className='size-6' />
        </span>
      </Button>
      <ul className={cn('menu-wrapper pt-2 t-m-18', isOpen && 'open')}>
        {menu.submenu.map((sub) => (
          <li key={sub.title} className='px-[10px] py-[8px]'>
            <Link to={sub.path} className='block hover:opacity-70 t-r-16'>
              {sub.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
