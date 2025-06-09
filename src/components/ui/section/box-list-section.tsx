import type { LucideIcon } from 'lucide-react';
import SectionHeader from '@/components/enroll/common/section-header';
import { cn } from '@/lib/utils';

type BoxListSectionProps = {
  title: string;
  contents: readonly {
    title: string;
    description?: string;
  }[];
  icon: LucideIcon;
};

export default function BoxListSection({
  title,
  contents,
  icon,
}: BoxListSectionProps) {
  const Icon = icon;

  return (
    <section className='space-y-6'>
      <SectionHeader title={title} />

      <ul className='space-y-4'>
        {contents.map(({ title, description }, index) => (
          <li
            key={title + index}
            className='group flex items-start gap-4 p-3 sm:p-5 rounded-[5px] box-shadow-style border border-bg-gray-d hover:border-primary transition-all duration-300 hover:shadow-md'
          >
            <div className='w-7 h-7 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0'>
              <Icon className='w-4 h-4' strokeWidth={3} />
            </div>

            <span className='leading-[28px]'>
              {title && (
                <p
                  className={cn(
                    'transition-colors duration-300',
                    description ? 't-m-16' : 't-r-16'
                  )}
                >
                  {title}
                </p>
              )}
              <p className='t-r-16 text-gray-6 transition-colors duration-300'>
                {description}
              </p>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
