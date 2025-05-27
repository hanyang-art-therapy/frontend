import GalleryIntroContentTitle from '@/components/gallery/intro/gallery-intro-content-title';
import { AnimatedSection, StaggeredList } from '@/components/ui/motion';
import { GALLERY_INTRO } from '@/constants/gallery/intro';

export default function GalleryIntro() {
  const { intro, purpose, participants, artTherapy, schedule, guide } =
    GALLERY_INTRO;

  const parseTextWithBold = (text: string) => {
    const BOLD_START = '<b>';
    const BOLD_END = '</b>';
    const boldRegex = /(<b>.*?<\/b>)/g;
    const parts = text.split(boldRegex);

    return parts.map((part) => {
      if (part.startsWith(BOLD_START) && part.endsWith(BOLD_END)) {
        const boldText = part.slice(BOLD_START.length, -BOLD_END.length);
        return <strong key={part}>{boldText}</strong>;
      }

      return part;
    });
  };

  return (
    <div className='mx-auto xl:px-0 px-5 md:pt-[100px] pt-[60px] grid gap-[60px] md:gap-[100px]'>
      {/* 전시 개요 */}
      <AnimatedSection className='grid md:grid-cols-[1fr_3fr]' delay={0.1}>
        <GalleryIntroContentTitle
          icon={intro.icon}
          title={intro.title}
          subTitle={intro.subTitle}
        />

        <StaggeredList
          className='space-y-[10px]'
          staggerDelay={0.08}
          itemClassName='text-gray-6 t-r-16'>
          {intro.content.map((text) => (
            <span key={text}>{parseTextWithBold(text)}</span>
          ))}
        </StaggeredList>
      </AnimatedSection>

      {/* 전시 목적 */}
      <AnimatedSection className='grid md:grid-cols-[1fr_3fr]' delay={0.1}>
        <GalleryIntroContentTitle icon={purpose.icon} title={purpose.title} />

        <StaggeredList
          className='space-y-5'
          staggerDelay={0.08}
          itemClassName='bg-bg-gray-fa p-[30px] rounded-lg'>
          {purpose.content.map(({ subTitle, description }) => (
            <>
              <h3 className='font-semibold text-lg mb-[10px] t-b-24'>
                {subTitle}
              </h3>
              <p className='text-gray-6 t-r-16'>{description}</p>
            </>
          ))}
        </StaggeredList>
      </AnimatedSection>

      {/* 전시 참여자 */}
      <AnimatedSection className='grid md:grid-cols-[1fr_3fr]' delay={0.1}>
        <GalleryIntroContentTitle
          icon={participants.icon}
          title={participants.title}
        />

        <StaggeredList
          className='space-y-[10px]'
          staggerDelay={0.08}
          itemClassName='text-gray-6 t-r-16'>
          {participants.content.map((text) => (
            <span key={text}>{parseTextWithBold(text)}</span>
          ))}
        </StaggeredList>
      </AnimatedSection>

      {/* 미술치료와 ART+THERAPY */}
      <AnimatedSection className='grid md:grid-cols-[1fr_3fr]' delay={0.1}>
        <GalleryIntroContentTitle
          icon={artTherapy.icon}
          title={artTherapy.title}
          subTitle={artTherapy.subTitle}
        />

        <StaggeredList
          className='space-y-[10px]'
          staggerDelay={0.08}
          itemClassName='text-gray-6 t-r-16'>
          {artTherapy.content.map((text) => (
            <span key={text}>{parseTextWithBold(text)}</span>
          ))}
        </StaggeredList>
      </AnimatedSection>

      {/* 전시 일정 및 위치 */}
      <AnimatedSection className='grid md:grid-cols-[1fr_3fr]' delay={0.1}>
        <GalleryIntroContentTitle icon={schedule.icon} title={schedule.title} />

        <StaggeredList
          className='space-y-5'
          staggerDelay={0.12}
          itemClassName='flex items-start gap-[10px]'>
          {schedule.content.map(({ icon: Icon, subTitle, description }) => (
            <div key={description} className='space-y-2.5'>
              <div className='flex items-center gap-2.5'>
                <Icon className='h-6 w-6 text-primary mt-1' />
                <h3 className='t-b-18 mt-1'>{subTitle}</h3>
              </div>
              <div>
                <p className='t-r-16'>{description}</p>
              </div>
            </div>
          ))}
        </StaggeredList>
      </AnimatedSection>

      {/* 관람 안내 */}
      <AnimatedSection className='grid md:grid-cols-[1fr_3fr]' delay={0.1}>
        <GalleryIntroContentTitle icon={guide.icon} title={guide.title} />

        <StaggeredList
          className='space-y-[10px]'
          staggerDelay={0.08}
          itemClassName='text-gray-6 t-r-16'>
          {guide.content.map((text) => (
            <span key={text}>{parseTextWithBold(text)}</span>
          ))}
        </StaggeredList>
      </AnimatedSection>
    </div>
  );
}
