import VideoBanner from '@/components/common/video-banner';
import Arts from '@/components/gallery/arts/arts';
import GalleryIntro from '@/components/gallery/intro/gallery-intro';
import Gallerytherapy from '@/components/gallery/therapy/gallery-therapy';
import Step from '@/components/ui/step';
import { GALLERY_STEP_ITEMS } from '@/constants/gallery/gallery';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [intro, therapy, arts] = GALLERY_STEP_ITEMS;
  const searchStep = searchParams.get('step') || arts.value;
  const [step, setStep] = useState(searchStep);
  const [lastId, setLastId] = useState<number>(0);

  const handleStepChange = (step: string) => {
    setSearchParams({ step });
    setStep(step);
    setLastId(0);
  };

  useEffect(() => {
    setStep(searchStep);
  }, [searchStep]);

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <VideoBanner
        src='/videos/gallery.mp4'
        title='ART+THERAPY 展'
        className='t-b-52'
      />

      <Step
        items={GALLERY_STEP_ITEMS}
        step={step}
        onChange={handleStepChange}
      />

      <div className='md:max-w-[1260px] w-full mx-auto'>
        {step === intro.value && <GalleryIntro key={`intro-${step}`} />}
        {step === therapy.value && <Gallerytherapy key={`therapy-${step}`} />}
        {step === arts.value && (
          <Arts key={`arts-${step}`} lastId={lastId} setLastId={setLastId} />
        )}
      </div>
    </div>
  );
}
