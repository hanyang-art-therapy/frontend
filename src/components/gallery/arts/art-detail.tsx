import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ART_WORKS_CONTACT } from '@/constants/gallery/art-details';
import DetailReviews from './detail/detail-reviews';
import ArtDetailNoResult from './detail/no-result/art-detail-no-result';

export default function ArtsDetail() {
  const { artsNo } = useParams();

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));

  if (!art) return <ArtDetailNoResult />;

  return (
    <div className='text-center flex justify-between p-[20px]'>
      <div className='md:max-w-[1260px] w-full mx-auto mt-[30px] md:mt-[60px]'>
        <div className='w-full h-[78px] flex items-center pt-[40px] pb-[20px] mb-[20px] border-b-[2px] border-b-[#DDD]'>
          <ul className='w-full flex justify-between t-b-32 font-bold'>
            <li>
              <Link
                to='/gallery'
                className='t-b-32 pr-[10px] hover:text-secondary cursor-pointer'>
                2025
              </Link>
            </li>
            <Link
              to='/gallery'
              className='t-b-32 pr-[10px] hover:text-primary cursor-pointer'>
              ART+THERAPY 展
            </Link>
          </ul>
        </div>

        <div>
          <div className='flex flex-col md:flex-row justify-between items-start pb-[40px] md:pb-[100px]'>
            {/* 작품 이미지 */}
            <div>
              <img
                src={art.file.url}
                alt={art.artist.artistName}
                className='w-full md:w-[720px]'
              />
            </div>
            {/* 작품 상세 박스 */}
            <div className='flex flex-col justify-start item-start gap-[40px] md:w-[40%]'>
              <div>
                <h2 className='t-b-24 text-left t-b-24 whitespace-nowrap my-[20px] md:mb-[40px]'>
                  작품 정보
                </h2>
                <div className='flex flex-col bg-bg-gray-fa rounded-sm justify-start items-start md:leading-[2] md:p-[20px] p-[20px]'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex w-full items-center gap-2'>
                      <span className='w-[60px] bg-gray-9 text-white rounded-sm'>
                        작품명
                      </span>
                      <span className='t-b-18'>{art.artName}</span>
                    </div>
                    <div className='flex w-full items-center gap-2'>
                      <span className='w-[60px] bg-gray-9 text-white rounded-sm'>
                        작가명
                      </span>
                      <span className='t-b-18'>{art.artist.artistName}</span>
                    </div>
                    <div className='flex w-full items-center gap-2'>
                      <span className='w-[60px] bg-gray-9 text-white rounded-sm'>
                        기수
                      </span>
                      <span className='t-b-18'>{art.artist.cohort}</span>
                    </div>
                    <div className='flex w-full items-center gap-2'>
                      <span className='w-[60px] bg-gray-9 text-white rounded-sm'>
                        재료
                      </span>
                      <span className='t-b-18'>{art.caption}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className='w-full t-b-24 text-left t-b-24 whitespace-nowrap'>
                  작품 설명
                </h2>
                <div className='flex h-auto md:p-[20px] flex-col items-start justify-start gap-[10px] rounded-sm md:mb-[100px]'>
                  {/* 설명 텍스트 */}
                  <div className='text-black t-r-18 text-left leading-[2] md:leading-[2] p-[10px]'>
                    {art.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DetailReviews />
        </div>
      </div>
    </div>
  );
}
