import ClinicalTitle from '@/components/clinical/clinical-title';
import SectionHeader from '@/components/enroll/common/section-header';
import { CLINICAL_CONTENTS } from '@/constants/clinical/clinical';
import { parseTextWithBold } from '@/lib/helper/text-bolder';
import { useEffect } from 'react';

type SectionProps = {
  category: string;
};

export default function Section({ category }: SectionProps) {
  const { sections } = CLINICAL_CONTENTS[category];

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
            <SectionHeader title={section.title} />
            <div className='pl-2'>
              <div className='mb-8'>
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
