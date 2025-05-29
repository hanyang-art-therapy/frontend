import ClinicalTitle from '@/components/clinical/clinical-title';
import { PATH_TO_CONTENTS } from '@/constants/common/common';
import { parseTextWithBold } from '@/lib/helper/text-bolder';
import { useEffect } from 'react';

type SectionProps = {
  category: string;
  path: keyof typeof PATH_TO_CONTENTS;
};

export default function Section({ category, path }: SectionProps) {
  const contents = PATH_TO_CONTENTS[path];

  const { sections } = contents[category];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className='pt-[60px]'>
      <ClinicalTitle category={category} />

      <ul className='space-y-10'>
        {sections.map((section, index) => (
          <li key={section.title + index} className='pl-1'>
            <h3 className='t-b-24 mb-8 flex items-center gap-4'>
              <div className='w-2 h-8 bg-primary' /> {section.title}
            </h3>

            <div className='pl-2'>
              <div className='space-y-5'>
                {section?.content?.map((paragraph, index) => (
                  <p key={index} className='t-r-18'>
                    {parseTextWithBold(paragraph)}
                  </p>
                ))}
              </div>

              {section.points && (
                <ul className='list-disc list-inside t-r-16 mt-2 space-y-3'>
                  {section.points.map((point, index) => (
                    <li key={index}>{parseTextWithBold(point)}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className='h-[1px] mt-10 bg-btn-gray-d' />
          </li>
        ))}
      </ul>
    </section>
  );
}
