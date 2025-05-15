import type { Art } from '@/types/gallery/art';
import { RefObject } from 'react';
import { Link } from 'react-router-dom';

type ArtsListProps = {
  art: Art;
  lastItemRef: RefObject<HTMLLIElement | null> | null;
};

export default function ArtsList({ art, lastItemRef }: ArtsListProps) {
  return (
    <li ref={lastItemRef}>
      <Link to={`/gallery/${art.artsNo}`} className='space-y-5'>
        <img
          src={art.files.url}
          alt={art.artName}
          className='w-[400px] h-[400px] object-cover'
        />

        <p className='t-b-24 text-center leading-[24px]'>
          {art.artist.length > 1 ? '공동 작품' : art.artist[0].artistName}
        </p>
      </Link>
    </li>
  );
}
