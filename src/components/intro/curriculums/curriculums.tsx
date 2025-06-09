import IntroTitle from '@/components/intro/intro-title';
import { CURRICULUMS } from '@/constants/intro/curriculum';
import Curriculum from '@/components/intro/curriculums/curriculum';
import Reference from '@/components/intro/curriculums/reference';
import { useSmoothToTop } from '@/hooks/use-smooth-to-top';

export default function Curriculums() {
  const { sections } = CURRICULUMS;

  useSmoothToTop();

  return (
    <div className='space-y-20 pt-15 min-h-screen-vh max-w-[1260px] mx-auto mt-15 xl:px-0 px-5'>
      <IntroTitle title='교육과정' />

      <div className='grid gap-8 md:gap-10'>
        {sections.map((section, index) => (
          <Curriculum
            key={section.title + index}
            section={section}
            index={index}
          />
        ))}
      </div>

      <IntroTitle title='참고사항' />

      <Reference />
    </div>
  );
}
