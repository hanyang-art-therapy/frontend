export default function GalleryBanner() {
  return (
    <div
      className='w-full h-[380px] bg-center bg-cover bg-no-repeat relative flex justify-center items-center'
      style={{ backgroundImage: "url('/images/banners/gallery-banner.webp')" }}>
      <span
        className='absolute text-white text-[80px] font-bold leading-none'
        style={{
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)',
        }}>
        ART+THERAPY 展
      </span>
    </div>
  );
}
