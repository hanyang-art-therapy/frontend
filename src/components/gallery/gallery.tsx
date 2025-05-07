import Arts from '@/components/gallery/arts/arts';
import GalleryBanner from '@/components/gallery/gallery-banner';
import GalleryIntro from '@/components/gallery/intro/gallery-intro';
import GalleryTheorapy from '@/components/gallery/theorapy/gallery-theorapy';
import Step from '@/components/ui/step';
import { GALLERY_STEP_ITEMS } from '@/constants/gallery/gallery';
import { useState } from 'react';

export default function Gallery() {
  const [intro, theorapy, arts] = GALLERY_STEP_ITEMS;
  const [step, setStep] = useState(arts);

  return (
    <>
      <GalleryBanner />
      <Step items={GALLERY_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='md:max-w-[1080px] w-full mx-auto'>
        {step === intro && <GalleryIntro />}
        {step === theorapy && <GalleryTheorapy />}
        {step === arts && <Arts />}
      </div>
    </>
  );
}
