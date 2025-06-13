import { ArtDetail } from '@/types/gallery/art';

type CoWorkDescriptionProps = Pick<ArtDetail, 'artists'>;

export default function CoWorkDescription({ artists }: CoWorkDescriptionProps) {
  return (
    <div className='text-left pb-[40px] md:pb-[100px] '>
      <h2 className='t-b-24 mb-4'>작가별 작품 설명</h2>
      <ul className='p-2 md:py-5 space-y-5'>
        {artists.map((artist, index) => (
          <li key={artist.artistName + index} className='space-y-3'>
            <p className='t-b-18'>{artist.description && artist.artistName}</p>
            <p className='t-r-16'>{artist.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
