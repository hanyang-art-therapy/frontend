import IntroTitle from '@/components/intro/intro-title';
import MouTable from '@/components/intro/mou/mou-table';
import BoxListSection from '@/components/ui/section/box-list-section';
import IntroSection from '@/components/ui/section/intro-section';
import { MOU } from '@/constants/intro/mou';
import { useSmoothToTop } from '@/hooks/use-smooth-to-top';

export default function Mou() {
  const { title, intro, purpose, institutions, expected } = MOU;

  useSmoothToTop();

  return (
    <div className='space-y-20 pt-15 min-h-screen-vh max-w-[1260px] mx-auto mt-15 xl:px-0 px-5'>
      <IntroTitle title={title} />
      <IntroSection title={intro.title} description={intro.description} />
      <BoxListSection
        title={purpose.title}
        contents={purpose.description}
        icon={purpose.icon}
      />
      <MouTable
        title={institutions.title}
        description={institutions.description}
        headers={institutions.headers}
        data={institutions.data}
      />
      <BoxListSection
        title={expected.title}
        contents={expected.description}
        icon={expected.icon}
      />
    </div>
  );
}
