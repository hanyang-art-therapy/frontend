import { Link } from 'react-router-dom';

type ArtDetailTitleProps = {
  title: string;
  startDate: string;
};

export default function ArtDetailTitle({
  title,
  startDate,
}: ArtDetailTitleProps) {
  const currentYear = startDate.split('-')[0];

  return (
    <div className='mt-[60px] mb-[40px]'>
      <div className='w-full flex justify-between pt-[30px] pb-[20px] h-auto items-center border-b-[1px] border-b-bg-gray-d t-b-32'>
        <Link
          to='/gallery'
          className='t-b-32 pr-[10px] hover:text-secondary cursor-pointer'
        >
          {currentYear}
        </Link>

        <Link
          to='/gallery'
          className='t-b-32 pr-[10px] hover:text-primary cursor-pointer'
        >
          {title}
        </Link>
      </div>
    </div>
  );
}
