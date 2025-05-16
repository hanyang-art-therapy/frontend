import type { Art } from '@/types/gallery/art';
import { Link } from 'react-router-dom';

type ArtsListProps = {
  art: Art;
};

export default function ArtsList({ art }: ArtsListProps) {
  if (!art) return null;
  return (
    <li>
      <Link to={`/gallery/${art.artsNo}`} className='space-y-5'>
        <img
          src={art.url}
          alt={art.artName}
          className='w-[400px] h-[400px] object-cover'
        />

        <p className='t-b-24 text-center leading-[24px]'>
          {art.artists.length > 1 ? '공동 작품' : art.artists[0].artistName}
        </p>
      </Link>
    </li>
  );
}
