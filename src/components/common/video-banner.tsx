type VideoBannerProps = {
  src: string;
  title: string;
};

export default function VideoBanner({ src, title }: VideoBannerProps) {
  return (
    <div className='relative video-banner-bg'>
      <video
        src={src}
        className='w-full h-full object-cover brightness-50'
        autoPlay
        loop
        muted
        playsInline
      />
      <span className='t-b-80'>{title}</span>
    </div>
  );
}
