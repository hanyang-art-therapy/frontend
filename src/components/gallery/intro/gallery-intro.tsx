import GalleryIntroContentTitle from '@/components/gallery/intro/gallery-intro-content-title';
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
      <section className='grid md:grid-cols-[1fr_3fr]'>
        <GalleryIntroContentTitle
          icon={intro.icon}
          title={intro.title}
          subTitle={intro.subTitle}
        />

        <ul className='space-y-[10px]'>
          {intro.content.map((text) => (
            <li key={text} className='text-gray'>
              {parseTextWithBold(text)}
            </li>
          ))}
        </ul>
      </section>

      {/* 전시 목적 */}
      <section className='grid md:grid-cols-[1fr_3fr]'>
        <GalleryIntroContentTitle icon={purpose.icon} title={purpose.title} />
        <ul className='space-y-5'>
          {purpose.content.map(({ subTitle, description }) => (
            <li key={subTitle} className='bg-bg-gray-fa p-[30px] rounded-lg'>
              <h3 className='font-semibold text-lg mb-[10px] t-b-24'>
                {subTitle}
              </h3>
              <p className='text-gray'>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 전시 참여자 */}
      <section className='grid md:grid-cols-[1fr_3fr]'>
        <GalleryIntroContentTitle
          icon={participants.icon}
          title={participants.title}
        />
        <ul className='space-y-[10px]'>
          {participants.content.map((text) => (
            <li key={text}>
              <p className='text-gray'>{parseTextWithBold(text)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 미술치료와 ART+THERAPY */}
      <section className='grid md:grid-cols-[1fr_3fr]'>
        <GalleryIntroContentTitle
          icon={artTherapy.icon}
          title={artTherapy.title}
          subTitle={artTherapy.subTitle}
        />
        <ul className='space-y-[10px]'>
          {artTherapy.content.map((text) => (
            <li key={text} className='text-gray'>
              {parseTextWithBold(text)}
            </li>
          ))}
        </ul>
      </section>

      {/* 전시 일정 및 위치 */}
      <section className='grid md:grid-cols-[1fr_3fr]'>
        <GalleryIntroContentTitle icon={schedule.icon} title={schedule.title} />

        <ul className='space-y-[10px]'>
          {schedule.content.map(({ icon: Icon, subTitle, description }) => (
            <li key={description} className='flex items-start gap-[10px]'>
              <Icon className='h-6 w-6 text-primary mt-1' />
              <div>
                <h3 className='t-b-18'>{subTitle}</h3>
                <p className='t-r-16'>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 관람 안내 */}
      <section className='grid md:grid-cols-[1fr_3fr]'>
        <GalleryIntroContentTitle icon={guide.icon} title={guide.title} />
        <ul className='space-y-[10px]'>
          {guide.content.map((text) => (
            <li key={text} className='text-gray'>
              {parseTextWithBold(text)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
