import SectionHeader from '@/components/enroll/common/section-header';
import { parseTextWithBold } from '@/lib/helper/text-bolder';
import { LucideIcon } from 'lucide-react';

type ListStyleSectionProps = {
  contents: string[];
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;
};

export default function ListStyleSection({
  contents,
  title,
  subTitle,
  icon,
}: ListStyleSectionProps) {
  const Icon = icon;

  return (
    <section className='space-y-6'>
      {title && <SectionHeader title={title} />}

      {subTitle && (
        <h2 className='t-b-18 flex items-center gap-2'>
          {Icon && <Icon className='w-4 h-4 text-primary' />}
          {subTitle}
        </h2>
      )}

      <ul className='list-disc list-inside t-r-16 mt-2 space-y-3'>
        {contents.map((content, index) => (
          <li key={content + index}>{parseTextWithBold(content)}</li>
        ))}
      </ul>
    </section>
  );
}
