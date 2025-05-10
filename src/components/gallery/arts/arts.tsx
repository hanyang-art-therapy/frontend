import { ART_CONTENT } from '@/constants/gallery/art';
import { useState } from 'react';
import ArtsList from '@/components/gallery/arts/arts-list';
import ArtsSearch from '@/components/gallery/arts/arts-search';

export default function Arts() {
  const [filteredArts, setFilteredArts] = useState(ART_CONTENT);

  return (
    <div className='flex flex-col justify-center items-center px-5 md:px-0'>
      <ArtsSearch arts={ART_CONTENT} setFilteredArts={setFilteredArts} />

      <ul className='grid-cols-1  grid md:grid-cols-3 md:w-full md:gap-x-[90px] gap-y-[50px]  pt-[68px]'>
        {filteredArts.map((art) => (
          <ArtsList key={art.artsNo} art={art} />
        ))}
      </ul>
    </div>
  );
}
