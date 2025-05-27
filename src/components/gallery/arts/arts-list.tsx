import type { Art } from '@/types/gallery/art';
import { Link } from 'react-router-dom';

type ArtsListProps = {
  art: Art;
};

export default function ArtsList({ art }: ArtsListProps) {
  if (!art) return null;

  const isCoArt = art.artists?.length > 1;

  return (
    <li>
      <Link to={`/gallery/${art.artsNo}`} className='space-y-1 md:space-y-0'>
        <div className='relative overflow-hidden group'>
          <img
            src={art.files.url}
            alt={art.artName}
            aria-label={art.artName}
            className='md:min-w-[230px] h-auto aspect-[1/1] object-cover box-shadow-style transition-transform duration-300 group-hover:scale-105'
          />

          <div className='absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out'>
            <div className='absolute bottom-0 right-0 p-5 text-white'>
              <p className='t-m-14 mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100'>
                {art.artName}
              </p>
              <p className='t-r-12 opacity-90 mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-150'>
                {isCoArt ? '공동 작품' : art.artists[0].artistName}
              </p>
              <p className='t-r-12 opacity-80 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-200'>
                {isCoArt ? art.coDescription : art.artists[0].description}
              </p>
            </div>
          </div>
        </div>

        <p className='t-b-18 w-full text-center inline-block md:hidden'>
          {isCoArt ? '공동 작품' : art.artists[0].artistName}
        </p>
      </Link>
    </li>
  );
}
