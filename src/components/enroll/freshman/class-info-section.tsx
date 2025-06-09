///

import { SectionHeader } from '@/components/enroll/common';
import { AlarmClock, Calendar1, GraduationCap, LibraryBig } from 'lucide-react';

type ClassInfoItem = {
  readonly icon: string;
  readonly title: string;
  readonly primary: string;
  readonly secondary?: string;
};

type ClassInfoSectionProps = {
  title: string;
  data: readonly ClassInfoItem[];
};

export default function ClassInfoSection({
  title,
  data,
}: ClassInfoSectionProps) {
  const iconMap = {
    Calendar1,
    AlarmClock,
    LibraryBig,
    GraduationCap,
  };

  return (
    <section className='space-y-6'>
      <SectionHeader title={title} />

      <div className='grid md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          {data.slice(0, 2).map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];

            return (
              <div
                key={index}
                className='p-4 sm:min-h-[112px] border-b border-bg-gray-d sm:border-none'
              >
                <h3 className='flex items-center gap-2 t-b-16 mb-3'>
                  <IconComponent className='text-primary' /> {item.title}
                </h3>
                <p className='t-r-16'>{item.primary}</p>
                {item.secondary && (
                  <p className='t-r-14 text-gray-6'>{item.secondary}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className='space-y-4'>
          {data.slice(2).map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];

            return (
              <div
                key={index + 2}
                className='p-4 sm:min-h-[112px] border-b border-bg-gray-d sm:border-none'
              >
                <h3 className='flex items-center gap-2 t-b-16 mb-3'>
                  <IconComponent className='text-primary' /> {item.title}
                </h3>
                <p className='t-r-16'>{item.primary}</p>
                {item.secondary && (
                  <p className='t-r-14 text-gray-6'>{item.secondary}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
