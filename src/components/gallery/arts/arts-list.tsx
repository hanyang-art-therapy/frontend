import { ArtArtistRel, Artist } from '@/types';
import type { Art } from '@/types/gallery/art';
import { Link } from 'react-router-dom';

type ArtsListProps = {
  art: Art;
};

type Artists = (Pick<Artist, 'artistName' | 'cohort'> &
  Pick<ArtArtistRel, 'description'>)[];

export default function ArtsList({ art }: ArtsListProps) {
  if (!art) return null;

  const isCoArt = art.artists?.length > 1;

  const renderArtistName = (artists: Artists) => {
    if (isCoArt) return '공동 작품';
    if (artists.length) return artists[0].artistName;

    return '익명';
  };

  const renderArtistDescription = (artists: Artists) => {
    if (isCoArt) return art.coDescription;
    if (artists.length) return artists[0].description;
    return '-';
  };

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
            <div className='absolute bottom-0 left-0 p-5 text-white'>
              <p className='t-m-14 mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100'>
                {art.artName}
              </p>
              <p className='t-r-12 opacity-90 mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-150'>
                {renderArtistName(art.artists)}
              </p>
              <p className='t-r-12 opacity-80 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-200'>
                {renderArtistDescription(art.artists)}
              </p>
            </div>
          </div>
        </div>

        <p className='t-b-18 w-full text-center inline-block md:hidden'>
          {renderArtistName(art.artists)}
        </p>
      </Link>
    </li>
  );
}
