import GallerytherapyContentTitle from '@/components/gallery/therapy/gallery-therapy-content-title';
import {
  AnimatedCard,
  AnimatedSection,
  StaggeredList,
} from '@/components/ui/motion';
import {
  GALLERY_THERAPY_ACADEMIC,
  GALLERY_THERAPY_INTRO,
  GALLERY_THERAPY_THEORY,
} from '@/constants/gallery/therapy';
import { parseTextWithBold } from '@/lib/helper/text-bolder';
import { cn } from '@/lib/utils';

export default function Gallerytherapy() {
  return (
    <div className='mx-auto xl:px-0 px-5 md:pt-[100px] pt-[60px] grid md:gap-[160px] gap-[100px]'>
      {/* 미술관 미술치료로의 초대 */}
      <AnimatedSection delay={0.1} className='text-center'>
        <GallerytherapyContentTitle
          firstTitle={GALLERY_THERAPY_INTRO.title.first}
          secondTitle={GALLERY_THERAPY_INTRO.title.second}
          strong='second'
        />

        <div className='mx-auto space-y-[10px] text-gray-6 text-left'>
          {GALLERY_THERAPY_INTRO.content.map((text, index) => (
            <p key={index} className='t-r-18'>
              {parseTextWithBold(text)}
            </p>
          ))}
          <p className='t-m-18 text-primary'>{GALLERY_THERAPY_INTRO.strong}</p>
        </div>
      </AnimatedSection>

      {/* 미술관 미술치료의 이론적 근거 */}
      <AnimatedSection delay={0.3} className='text-center'>
        <GallerytherapyContentTitle
          firstTitle={GALLERY_THERAPY_THEORY.title.first}
          secondTitle={GALLERY_THERAPY_THEORY.title.second}
          strong='second'
        />

        <div className='mx-auto rounded-xl bg-white p-[30px] box-shadow-style'>
          <p className='mx-auto w-auto max-w-[845px] text-gray-6-6 t-r-16 text-center'>
            {parseTextWithBold(GALLERY_THERAPY_THEORY.description)}
          </p>

          <StaggeredList
            className='mt-[30px] grid gap-5 md:grid-cols-2'
            itemClassName='flex flex-col items-center rounded-lg bg-bg-muted p-4 text-center'
          >
            {GALLERY_THERAPY_THEORY.cards.map((card) => (
              <>
                <card.icon className='mb-4 h-12 w-12 text-primary' />
                <h3 className='mb-2 t-b-18'>{card.title}</h3>
                <p className='text-gray-6 t-r-16'>
                  {parseTextWithBold(card.description)}
                </p>
              </>
            ))}
          </StaggeredList>
        </div>
      </AnimatedSection>

      {/* 미술관 미술치료의 학술적 이해 */}
      <AnimatedSection delay={0.1} className='text-center'>
        <GallerytherapyContentTitle
          firstTitle={GALLERY_THERAPY_ACADEMIC.title.first}
          secondTitle={GALLERY_THERAPY_ACADEMIC.title.second}
          strong='second'
        />

        {GALLERY_THERAPY_ACADEMIC.sections.map((section, index) => (
          <AnimatedCard
            key={section.title + index}
            className={cn(
              'border-b border-bg-gray-d py-12',
              index === 0 && 'md:pt-12 pt-0'
            )}
          >
            <h3 className='mb-4 flex items-center t-b-18'>
              <p className='mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white'>
                {index + 1}
              </p>
              <p className='t-b-18 text-left'>{section.title}</p>
            </h3>

            <div className='space-y-3 pl-11 text-gray-6 text-left'>
              {section.content.map((text) => (
                <p key={text} className='t-r-16'>
                  {parseTextWithBold(text)}
                </p>
              ))}
            </div>
          </AnimatedCard>
        ))}
      </AnimatedSection>
    </div>
  );
}
