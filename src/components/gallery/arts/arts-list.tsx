import { Link } from 'react-router-dom';
import type { Art } from '@/types/gallery/art';

export default function ArtsList({ art }: { art: Art }) {
  return (
    <li>
      <Link to={`/gallery/${art.artsNo}`} className='space-y-5'>
        <img
          src={art.files.url}
          alt={art.artName}
          className='w-[400px] h-[400px] object-cover'
        />

        <p className='t-b-24 text-center leading-[24px]'>
          {art.artist.artistName}
        </p>
      </Link>
    </li>
  );
}
