import { CLINICAL_ACTIVITIES } from '@/constants/clinical/clinical';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  return (
    <div className='flex justify-between mt-15'>
      <Button
        variant='outline'
        className='group transition-colors duration-200 group xl:w-[200px] md:w-[120px] w-[96px]'
        onClick={handlePrevClick}
      >
        <div className='group-hover:-translate-x-1 transition-transform duration-500'>
          {prevActivity ? <ArrowLeft size={20} /> : <Home size={20} />}
        </div>
        <span className='t-r-16 group-hover:-translate-x-1 transition-transform duration-500'>
          {prevActivity?.title ?? '홈'}
        </span>
      </Button>

      <Button
        variant='outline'
        className='group transition-colors duration-200 group xl:w-[200px] md:w-[120px] w-[96px]'
        onClick={handleNextClick}
      >
        <span className='t-r-16 group-hover:translate-x-1 transition-transform duration-500'>
          {nextActivity?.title ?? '홈'}
        </span>

        <div className='group-hover:translate-x-1 transition-transform duration-500'>
          {nextActivity ? <ArrowRight size={20} /> : <Home size={20} />}
        </div>
      </Button>
    </div>
  );
}
