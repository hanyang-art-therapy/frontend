import { Button } from '@/components/ui/button';
import { CLINICAL_ACTIVITIES } from '@/constants/clinical/clinical';
import { AlignJustify, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClinicalNav({ category }: { category: string }) {
  const navigate = useNavigate();

  const currentIndex = CLINICAL_ACTIVITIES.findIndex(
    (activity) => activity.id === category
  );

  const prevActivity = CLINICAL_ACTIVITIES[currentIndex - 1];
  const nextActivity = CLINICAL_ACTIVITIES[currentIndex + 1];

  const handlePrevClick = () => {
    if (prevActivity) navigate(`/clinical/${prevActivity.id}`);
    else navigate('/clinical');
  };

  const handleNextClick = () => {
    if (nextActivity) navigate(`/clinical/${nextActivity.id}`);
    else navigate('/clinical');
  };

  const handleListClick = () => {
    navigate('/clinical');
  };

  return (
    <div className='grid grid-cols-3 justify-between items-center mt-15'>
      <div className='flex justify-start'>
        {prevActivity && (
          <Button
            variant='outline'
            className='group transition-colors duration-200 group xl:w-[200px] md:w-[120px] w-[96px]'
            onClick={handlePrevClick}
          >
            <div className='group-hover:-translate-x-1 transition-transform duration-500'>
              <ArrowLeft size={20} />
            </div>
            <span className='t-r-16'>{prevActivity?.title}</span>
          </Button>
        )}
      </div>

      <div className='flex justify-center'>
        <Button
          variant='outline'
          className='group transition-colors duration-200 group xl:w-[200px] md:w-[120px] w-[96px]'
          onClick={handleListClick}
        >
          <AlignJustify size={20} />
          <span className='t-r-16'>목록</span>
        </Button>
      </div>

      <div className='flex justify-end'>
        {nextActivity && (
          <Button
            variant='outline'
            className='group ml-auto transition-colors duration-200 group xl:w-[200px] md:w-[120px] w-[96px]'
            onClick={handleNextClick}
          >
            <span className='t-r-16'>{nextActivity?.title}</span>

            <div className='group-hover:translate-x-1 transition-transform duration-500'>
              <ArrowRight size={20} />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
