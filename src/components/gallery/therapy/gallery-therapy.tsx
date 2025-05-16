import GallerytherapyContentTitle from '@/components/gallery/therapy/gallery-therapy-content-title';
import {
  GALLERY_THERAPY_ACADEMIC,
  GALLERY_THERAPY_INTRO,
  GALLERY_THERAPY_THEORY,
} from '@/constants/gallery/therapy';

const renderTextWithBold = (text: string) => {
  const parts = text.split('<b>');
  return parts.map((part, index) => {
    if (part.includes('</b>')) {
      const [boldText, rest] = part.split('</b>');

      return (
        <span key={index}>
          <strong>{boldText}</strong>
          {rest}
        </span>
      );
    }
    return part;
  });
};

export default function Gallerytherapy() {
  return (
    <div className='mx-auto md:px-0 px-5 pt-15 grid gap-16'>
      {/* 미술관 미술치료로의 초대 */}
      <section className='pb-16'>
        <div>
          <GallerytherapyContentTitle
            firstTitle={GALLERY_THERAPY_INTRO.title.first}
            secondTitle={GALLERY_THERAPY_INTRO.title.second}
            strong='second'
          />

          <div className='mx-auto md:max-w-[720px] space-y-6 text-gray'>
            {GALLERY_THERAPY_INTRO.content.map((text, index) => (
              <p key={index} className='t-r-18'>
                {renderTextWithBold(text)}
              </p>
            ))}
            <p className='t-m-18 text-primary'>
              {GALLERY_THERAPY_INTRO.strong}
            </p>
          </div>
        </div>
      </section>

      {/* 미술관 미술치료의 이론적 근거 */}
      <section className='bg-bg-muted py-16 mx-0'>
        <div>
          <GallerytherapyContentTitle
            firstTitle={GALLERY_THERAPY_THEORY.title.first}
            secondTitle={GALLERY_THERAPY_THEORY.title.second}
            strong='second'
          />

          <div className='mx-auto md:max-w-[720px] rounded-xl bg-white p-8 shadow-sm'>
            <p className='text-gray t-r-16'>
              {renderTextWithBold(GALLERY_THERAPY_THEORY.description)}
            </p>

            <div className='mt-8 grid gap-6 md:grid-cols-2'>
              {GALLERY_THERAPY_THEORY.cards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <div
                    key={index}
                    className='flex flex-col items-center rounded-lg bg-bg-muted p-4 text-center'>
                    <Icon className='mb-4 h-12 w-12 text-primary' />
                    <h3 className='mb-2 t-b-16'>{card.title}</h3>
                    <p className='text-gray t-r-14'>
                      {renderTextWithBold(card.description)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 미술관 미술치료의 학술적 이해 */}
      <section className='py-16'>
        <div>
          <GallerytherapyContentTitle
            firstTitle={GALLERY_THERAPY_ACADEMIC.title.first}
            secondTitle={GALLERY_THERAPY_ACADEMIC.title.second}
            strong='second'
          />

          <div className='mx-auto md:max-w-[720px]'>
            {GALLERY_THERAPY_ACADEMIC.sections.map((section) => (
              <div
                key={section.number}
                className='border-b border-bg-gray-d py-12'>
                <h3 className='mb-4 flex items-center t-b-18'>
                  <p className='mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white'>
                    {section.number}
                  </p>
                  <p className='t-b-24'>{section.title}</p>
                </h3>

                <div className='space-y-3 pl-11 text-gray'>
                  {section.content.map((text) => (
                    <p key={text} className='t-r-18'>
                      {renderTextWithBold(text)}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
