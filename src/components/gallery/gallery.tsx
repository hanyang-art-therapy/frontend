import Arts from '@/components/gallery/arts/arts';
import GalleryBanner from '@/components/gallery/gallery-banner';
import GalleryIntro from '@/components/gallery/intro/gallery-intro';
import GalleryTheorapy from '@/components/gallery/theorapy/gallery-theorapy';
import Step from '@/components/ui/step';
import { GALLERY_STEP_ITEMS } from '@/constants/gallery/gallery';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const [intro, theorapy, arts] = GALLERY_STEP_ITEMS;

  const searchStep = searchParams.get('step') || arts.value;

  const [step, setStep] = useState(searchStep);

  return (
    <>
      <GalleryBanner />
      <Step items={GALLERY_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='md:max-w-[1280px] w-full mx-auto'>
        {step === intro.value && <GalleryIntro />}
        {step === theorapy.value && <GalleryTheorapy />}
        {step === arts.value && <Arts />}
      </div>
    </>
  );
}
