import IntroTitle from '@/components/intro/intro-title';
import BoxListSection from '@/components/ui/section/box-list-section';
import IntroSection from '@/components/ui/section/intro-section';
import { VISION } from '@/constants/intro/vision';
import { useSmoothToTop } from '@/hooks/use-smooth-to-top';

export default function Vision() {
  const { intro, mission, vision, core } = VISION;

  useSmoothToTop();

  return (
    <div className='space-y-20 pt-15 min-h-screen-vh max-w-[1260px] mx-auto mt-15 xl:px-0 px-5'>
      <IntroTitle title='미래상' />
      <IntroSection title={intro.title} description={intro.content} />
      <IntroSection title={mission.title} description={mission.content} />
      <IntroSection title={vision.title} description={vision.content} />
      <BoxListSection
        title={core.title}
        contents={core.content}
        icon={core.icon}
      />
    </div>
  );
}
