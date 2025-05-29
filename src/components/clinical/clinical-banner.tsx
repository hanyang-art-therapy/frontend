export default function ClinicalBanner() {
  return (
    <div className='relative clinical-banner-bg'>
      <video
        src='/videos/clinical.mp4'
        className='w-full h-full object-cover brightness-50'
        autoPlay
        loop
        muted
        playsInline
      />
      <span className='t-b-80'>임상 활동</span>
    </div>
  );
}
