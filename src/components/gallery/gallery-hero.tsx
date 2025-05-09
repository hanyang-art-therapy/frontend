export default function GalleryHero({ title }: { title: string }) {
  return (
    <div className='w-full bg-gradient-to-r from-orange-50 to-indigo-50'>
      <h2 className='t-b-24 md:t-b-52 font-bold text-center tracking-tight px-4 py-16 md:py-24'>
        {title}
        <p className='w-20 h-1 bg-primary mx-auto my-8'></p>
      </h2>
    </div>
  );
}
