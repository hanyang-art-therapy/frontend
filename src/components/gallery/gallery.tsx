import GalleryBanner from '@/components/gallery/gallery-banner';
import Step from '@/components/ui/step';
import { GALLERY_STEP_ITEMS } from '@/constants/gallery';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Gallery() {
  const [step, setStep] = useState('갤러리');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const matchedItem = GALLERY_STEP_ITEMS.find((item) =>
      location.pathname.includes(item.path)
    );
    if (matchedItem) {
      setStep(matchedItem.label);
    }
  }, [location]);

  const handleStepChange = (label: string) => {
    const target = GALLERY_STEP_ITEMS.find((item) => item.label === label);
    if (target) {
      navigate(target.path);
      setStep(label);
    }
  };

  return (
    <>
      <GalleryBanner />
      <Step items={GALLERY_STEP_ITEMS} step={step} setStep={handleStepChange} />
    </>
  );
}
