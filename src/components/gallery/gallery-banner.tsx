
export default function GalleryBanner() {
  return (
  <div className="w-[inherit] h-[380px] bg-[url('/images/banners/gallery-banner.jpg')] bg-center bg-cover bg-no-repeat relative flex justify-center items-center">
    <span className="absolute text-white text-[80px] font-bold leading-none" style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.4)', fontFamily: 'Noto Sans KR' }}>ART+THERAPY 展</span>
  </div>
  );
}
