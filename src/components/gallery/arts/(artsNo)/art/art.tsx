import type { ArtDetail as ArtDetailType } from '@/types/gallery/art';
import ArtImage from '@/components/gallery/arts/(artsNo)/art/art-image';
import ArtInfo from '@/components/gallery/arts/(artsNo)/art/info/art-info';
import ArtDescription from '@/components/gallery/arts/(artsNo)/art/art-description';
import CoWorkDescription from '@/components/gallery/arts/(artsNo)/art/cowork/co-work-description';
import { COWORK_2025_ART_NO } from '@/constants/gallery/art-details';

export default function Art({ artDetail }: { artDetail: ArtDetailType }) {
  const { file, description, artName, artist, caption, artsNo } = artDetail;

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col justify-between xl:flex-row pb-[60px] md:pb-[100px] gap-[60px] xl:gap-0'>
        {/* 작품 이미지 */}
        <ArtImage url={file.url} name={file.name} />

        <div className='xl:w-[40%] w-full space-y-[60px] md:space-y-[100px] mx-auto xl:mx-0'>
          {/* 작품 상세 박스 */}
          <ArtInfo artName={artName} artist={artist} caption={caption} />

          {/* 작품 설명 */}
          <ArtDescription description={description} />
        </div>
      </div>
      {artsNo === COWORK_2025_ART_NO && <CoWorkDescription />}
    </div>
  );
}
