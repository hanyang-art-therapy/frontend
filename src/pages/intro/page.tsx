import VideoBanner from '@/components/common/video-banner';
import Intro from '@/components/intro/intro';

export default function IntroPage() {
  return (
    <>
      <VideoBanner src='/videos/intro.mp4' title='학과 소개' />
      <Intro />
    </>
  );
}
