import { ArtDetail } from '@/types/gallery/art';

type ArtDescriptionProps = Pick<ArtDetail, 'artists' | 'coDescription'>;

export default function ArtDescription({
  artists,
  coDescription,
}: ArtDescriptionProps) {
  const content = coDescription
    ? coDescription
    : artists.map((artist) => artist.description).join('\n');

  return (
    <div>
      <h2 className='text-left t-b-24 mb-4'>작품 설명</h2>
      <div className='flex flex-col items-start justify-start gap-[10px] rounded-[5px] bg-bg-gray-fa p-4'>
        <div className='t-r-18 text-left leading-[2] md:leading-[2] md:p-[10px] whitespace-pre-line'>
          {content}
        </div>
      </div>
    </div>
  );
}
