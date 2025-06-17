import type { Artist } from '@/types';
import ArtInfoItem from './art-info-item';

type ArtInfoProps = {
  artName: string;
  artists: Pick<Artist, 'artistName' | 'cohort'>[];
  caption: string;
};

export default function ArtInfo({ artName, artists, caption }: ArtInfoProps) {
  return (
    <div>
      <h2 className='t-b-24 text-left t-b-24 mb-4'>작품 정보</h2>
      <div className='flex flex-col bg-bg-gray-fa rounded-[5px] justify-start items-start md:leading-[2] xl:p-6 p-4'>
        <div className='flex flex-col gap-4'>
          <ArtInfoItem label='작품명'>{artName}</ArtInfoItem>

          <ArtInfoItem label='작가명'>
            {artists.map((name, index) => (
              <span key={index}>
                {name.artistName}
                {index !== artists.length - 1 && ', '}
              </span>
            ))}
          </ArtInfoItem>

          {artists.length === 1 && (
            <ArtInfoItem label='기수'>{artists[0].cohort}</ArtInfoItem>
          )}

          <ArtInfoItem label='캡션'>{caption}</ArtInfoItem>
        </div>
      </div>
    </div>
  );
}
