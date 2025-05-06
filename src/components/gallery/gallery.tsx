import Arts from '@/components/gallery/arts/arts';
import GalleryBanner from '@/components/gallery/gallery-banner';
import Step from '@/components/ui/step';
import { GALLERY_STEP_ITEMS } from '@/constants/gallery';
import { useState } from 'react';

export default function Gallery() {
  const [step, setStep] = useState(GALLERY_STEP_ITEMS[2]);

  return (
    <>
      <GalleryBanner />
      <Step items={GALLERY_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='md:max-w-[1080px] w-full mx-auto'>
        {step === GALLERY_STEP_ITEMS[2] && <Arts />}
      </div>
    </>
  );
}
