import SectionHeader from '@/components/enroll/common/section-header';
import { parseTextWithBold } from '@/lib/helper/text-bolder';

type IntroSectionProps = {
  title: string;
  description?: readonly string[];
};

export default function IntroSection({
  title,
  description,
}: IntroSectionProps) {
  return (
    <section className='space-y-6'>
      <SectionHeader title={title} />

      <div className='mx-auto'>
        {description?.map((text, index) => (
          <p key={text + index} className='t-r-18'>
            {parseTextWithBold(text)}
          </p>
        ))}
      </div>
    </section>
  );
}
