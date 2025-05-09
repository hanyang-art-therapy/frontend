import { Link } from 'react-router-dom';
// import type { Art } from '@/types/gallery/art';

export default function ArtsList({
  data,
}: {
  data: {
    id: number;
    artistName: string;
    artTitle: string;
    cohort: string;
    src: string;
  }[];
}) {
  return (
    <ul className=' flex flex-wrap gap-[60px] justify-between'>
      {data.map((art) => (
        <li className='space-y-5' key={art.id}>
          <div>
            <Link to={`/gallery/${art.id}`}>
              <img
                src={art.src}
                className='w-[300px] h-[300px] object-cover'
                alt={art.artistName}
              />
            </Link>
          </div>

          <p className='t-b-24 text-center'>
            {art.cohort} {art.artistName}
          </p>
        </li>
      ))}
    </ul>
  );
}
