import GalleryHero from '@/components/gallery/gallery-hero';
import GalleryIntroContent from '@/components/gallery/intro/gallery-intro-content';
import { GALLERY_INTRO } from '@/constants/gallery/gallery';

export default function GalleryIntro() {
  return (
    <>
      <GalleryHero title={GALLERY_INTRO.title} />
      <GalleryIntroContent />
    </>
  );
}
