export default function ArtDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div>
      <h2 className='text-left t-b-24 mb-[30px]'>작품 설명</h2>
      <div className='flex  flex-col items-start justify-start gap-[10px] rounded-[5px]'>
        <div className='t-r-18 text-left leading-[2] md:leading-[2]'>
          {description}
        </div>
      </div>
    </div>
  );
}
