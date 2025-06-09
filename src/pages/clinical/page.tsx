import Clinical from '@/components/clinical/clinical';
import VideoBanner from '@/components/common/video-banner';

export default function ClinicalPage() {
  return (
    <>
      <VideoBanner src='/videos/clinical.mp4' title='임상 활동' />
      <Clinical />
    </>
  );
}
