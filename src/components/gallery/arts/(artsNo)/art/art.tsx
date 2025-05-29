import ArtDescription from '@/components/gallery/arts/(artsNo)/art/art-description';
import ArtImage from '@/components/gallery/arts/(artsNo)/art/art-image';
import ArtInfo from '@/components/gallery/arts/(artsNo)/art/info/art-info';
import type { ArtDetail as ArtDetailType } from '@/types/gallery/art';
import { useEffect } from 'react';

export default function Art({ artDetail }: { artDetail: ArtDetailType }) {
  const { file, description, artName, artist, caption } = artDetail;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col justify-between xl:flex-row pb-[60px] md:pb-[100px] gap-[60px] xl:gap-0'>
        {/* 작품 이미지 */}
        <ArtImage url={file.url} name={file.name} />

        <div className='xl:w-[40%] w-full space-y-[60px] md:space-y-[100px] mx-auto xl:mx-0 px-10'>
          {/* 작품 상세 박스 */}
          <ArtInfo artName={artName} artist={artist} caption={caption} />

          {/* 작품 설명 */}
          <ArtDescription description={description} />
        </div>
      </div>
    </div>
  );
}
