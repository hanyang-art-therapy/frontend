import ProfessorsContent from '@/components/intro/professors/professors-content';
import IntroTitle from '@/components/intro/intro-title';

export default function Professors() {
  return (
    <div className='max-w-[1080px] mx-auto mt-15 pt-[60px] md:px-0 px-5'>
      <IntroTitle title='교수진 소개' />
      <ProfessorsContent />
    </div>
  );
}
