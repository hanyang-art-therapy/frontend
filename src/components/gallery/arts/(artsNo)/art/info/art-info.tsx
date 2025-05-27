import type { Artist } from '@/types';
import ArtInfoItem from './art-info-item';

type ArtInfoProps = {
  artName: string;
  artist: Pick<Artist, 'artistName' | 'cohort'>[];
  caption: string;
};

export default function ArtInfo({ artName, artist, caption }: ArtInfoProps) {
  return (
    <div>
      <h2 className='t-b-24 text-left t-b-24 mb-[30px]'>작품 정보</h2>
      <div className='flex flex-col bg-bg-gray-fa rounded-[5px] justify-start items-start md:leading-[2] p-[30px]'>
        <div className='flex flex-col gap-[10px]'>
          <ArtInfoItem label='작품명'>{artName}</ArtInfoItem>

          <ArtInfoItem label='작가명'>
            {artist.map((name, index) => (
              <span key={index}>
                {name.artistName}
                {index !== artist.length - 1 && ', '}
              </span>
            ))}
          </ArtInfoItem>

          {artist.length === 1 && (
            <ArtInfoItem label='기수'>{artist[0].cohort}</ArtInfoItem>
          )}

          <ArtInfoItem label='캡션'>{caption}</ArtInfoItem>
        </div>
      </div>
    </div>
  );
}
