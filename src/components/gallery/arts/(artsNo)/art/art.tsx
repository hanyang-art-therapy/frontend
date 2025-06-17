import ArtDescription from '@/components/gallery/arts/(artsNo)/art/art-description';
import ArtImage from '@/components/gallery/arts/(artsNo)/art/art-image';
import CoWorkDescription from '@/components/gallery/arts/(artsNo)/art/cowork/co-work-description';
import ArtInfo from '@/components/gallery/arts/(artsNo)/art/info/art-info';
import type { ArtDetail as ArtDetailType } from '@/types/gallery/art';
import { useEffect } from 'react';

export default function Art({ artDetail }: { artDetail: ArtDetailType }) {
  const { file, artName, artists, caption, coDescription } = artDetail;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col justify-between xl:flex-row pb-15 md:pb-[100px] gap-[60px] xl:gap-0'>
        {/* 작품 이미지 */}
        <ArtImage url={file.url} name={file.name} />

        <div className='xl:w-[40%] w-full space-y-15 md:space-y-20 mx-auto xl:mx-0'>
          {/* 작품 상세 박스 */}
          <ArtInfo artName={artName} artists={artists} caption={caption} />

          {/* 작품 설명 */}
          <ArtDescription artists={artists} coDescription={coDescription} />
        </div>
      </div>
      {coDescription && <CoWorkDescription artists={artists} />}
    </div>
  );
}
