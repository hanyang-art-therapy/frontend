import ProfessorsContent from '@/components/intro/professors/professors-content';
import IntroTitle from '@/components/intro/intro-title';
import { useSmoothToTop } from '@/hooks/use-smooth-to-top';

export default function Professors() {
  useSmoothToTop();

  return (
    <div className='pt-15 space-y-20 min-h-screen-vh max-w-[1260px] mx-auto mt-15 xl:px-0 px-5'>
      <IntroTitle title='교수진 소개' />
      <ProfessorsContent />
    </div>
  );
}
