import { Link } from 'react-router-dom';

export default function ArtDetailNoResult() {
  return (
    <div className='w-[1260px] h-[1000px] mx-auto flex flex-col items-center justify-center py-16 text-center bg-gray-50 border border-gray-200 rounded-lg cursor-pointer'>
      <h3 className='text-2xl font-semibold text-gray-800'>
        작품을 찾을 수 없습니다.
      </h3>
      <p className='mt-4 text-lg text-gray-500'>
        해당 작품은 존재하지 않거나 삭제되었습니다. 다른 작품을 찾아보세요.
      </p>
      <div className='mt-8'>
        <Link to='/gallery'>
          <button className='px-6 py-2 text-white  bg-muted rounded-md hover:bg-bg-primary  transition-all'>
            다른 작품 보기
          </button>
        </Link>
      </div>
    </div>
  );
}
