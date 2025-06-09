import { Link } from 'react-router-dom';
import { SquareArrowOutUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContactItem } from '@/types/enroll';
import { SectionHeader } from '@/components/enroll/common';

type ContactInfoProps = {
  title: string;
  data: readonly ContactItem[];
};

export default function ContactInfo({ title, data }: ContactInfoProps) {
  return (
    <div className='bg-white border border-bg-gray-d rounded-[5px] min-h-[112px] p-6 box-shadow-style space-y-6'>
      <SectionHeader title={title} />

      <ul className='space-y-6'>
        {data.map((item, index) => (
          <li key={item.title + index} className='flex items-center gap-3'>
            <div
              className={cn(
                'w-7 h-7 text-white rounded-full flex items-center justify-center flex-shrink-0',
                item.bgColor
              )}
            >
              <item.icon className='w-4 h-4' strokeWidth={2} />
            </div>
            <div>
              <h3 className='t-m-16'>{item.title}</h3>
              <Link
                to={item.link ?? '#'}
                className='t-r-14 text-gray-6 underline hover:text-primary transition-colors flex items-center gap-2'
              >
                <SquareArrowOutUpRight className='w-4 h-4 flex-shrink-0' />
                {item.linkText}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
