import GalleryIntroContentTitle from '@/components/gallery/intro/gallery-intro-content-title';
import { GALLERY_INTRO } from '@/constants/gallery/gallery';

export default function GalleryIntroContent() {
  const { intro, purpose, participants, artTherapy, guide } = GALLERY_INTRO;

  return (
    <div className=' mx-auto px-4 py-12 grid gap-16'>
      {/* 전시 개요 */}
      <section className='grid md:grid-cols-[1fr_3fr] gap-8'>
        <GalleryIntroContentTitle icon={intro.icon} title={intro.title} />

        <span className='space-y-4'>
          {intro.description.map((text, idx) =>
            idx % 2 === 0 ? (
              <span key={text + idx} className='text-gray'>
                {text}
              </span>
            ) : (
              <span key={text + idx} className='font-semibold'>
                {text}
              </span>
            )
          )}
        </span>
      </section>

      {/* 전시 목적 */}
      <section className='grid md:grid-cols-[1fr_3fr] gap-8'>
        <GalleryIntroContentTitle icon={purpose.icon} title={purpose.title} />
        <ul className='list-disc pl-5 space-y-3 text-gray'>
          {purpose.description.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </ul>
      </section>

      {/* 전시 참여자 */}
      <section className='grid md:grid-cols-[1fr_3fr] gap-8'>
        <GalleryIntroContentTitle
          icon={participants.icon}
          title={participants.title}
        />
        <ul className='space-y-4'>
          {participants.description.map((text) => (
            <li
              key={text.subDescription}
              className='bg-bg-gray-fa p-6 rounded-lg'>
              <h3 className='font-semibold text-lg mb-2'>{text.subTitle}</h3>
              <p className='text-gray'>{text.subDescription}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 미술치료와 ART+THERAPY */}
      <section className='grid md:grid-cols-[1fr_3fr] gap-8'>
        <GalleryIntroContentTitle
          icon={artTherapy.icon}
          title={artTherapy.title}
        />
        <span className='text-gray'>
          {artTherapy.description.map((text, idx) =>
            idx % 2 === 0 ? (
              <span key={text + idx} className='text-gray'>
                {text}
              </span>
            ) : (
              <span key={text + idx} className='font-semibold'>
                {text}
              </span>
            )
          )}
        </span>
      </section>

      {/* 전시 일정 및 위치 */}
      {/* <section className='grid md:grid-cols-[1fr_3fr] gap-8'>
        <GalleryIntroContentTitle icon={schedule.icon} title={schedule.title} />
        <ul className='space-y-6'>
          {schedule.description.map(
            ({ icon: Icon, subTitle, subDescription }) => (
              <li className='flex items-start gap-4'>
                <Icon className='h-5 w-5 text-bg-gray-fa0 mt-1' />
                <div>
                  <h3 className='font-semibold'>{subTitle}</h3>
                  <p className='text-gray'>{subDescription}</p>
                </div>
              </li>
            )
          )}
        </ul>
      </section> */}

      {/* 관람 안내 */}
      <section className='grid md:grid-cols-[1fr_3fr] gap-8'>
        <GalleryIntroContentTitle icon={guide.icon} title={guide.title} />
        <p className='text-gray'>{guide.description}</p>
      </section>
    </div>
  );
}
