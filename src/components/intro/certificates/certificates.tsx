import FinalMessageSection from '@/components/enroll/common/final-message-section';
import IntroTitle from '@/components/intro/intro-title';
import BoxListSection from '@/components/ui/section/box-list-section';
import IntroSection from '@/components/ui/section/intro-section';
import { CERTIFICATES } from '@/constants/intro/certificates';
import { useSmoothToTop } from '@/hooks/use-smooth-to-top';

export default function Certificates() {
  const { title, items, icon, quote, finalMessage } = CERTIFICATES;

  useSmoothToTop();

  return (
    <div className='space-y-20 pt-15 min-h-screen-vh max-w-[1260px] mx-auto mt-15 xl:px-0 px-5'>
      <IntroTitle title='자격사항' />
      <IntroSection title={quote.title} description={quote.content} />
      <BoxListSection title={title} contents={items} icon={icon} />
      <FinalMessageSection secondary={finalMessage.secondary} />
    </div>
  );
}
