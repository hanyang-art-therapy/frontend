import { INTRO_ACTIVITIES } from '@/constants/intro/intro';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className='md:max-w-[1260px] mx-auto mt-[10vw] sm:mt-[4vw] xl:px-0 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10vw] sm:gap-[4vw]'>
      {INTRO_ACTIVITIES.map((activity) => {
        const IconComponent = activity.icon;

        return (
          <div
            key={activity.id}
            className='box-shadow-style hover:shadow-xl duration-300 cursor-pointer p-6 rounded-[5px] group'
            onClick={() => navigate(`/intro/${activity.id}`)}
          >
            <div className='pb-4'>
              <div className='flex items-center justify-between mb-4'>
                <div
                  className={cn('p-3 rounded-[5px] text-white', activity.color)}
                >
                  <IconComponent className='h-6 w-6' />
                </div>
                <ArrowRight className='h-7 w-7 text-gray-6 group-hover:text-primary  group-hover:translate-x-1 duration-200 transition-transform' />
              </div>

              <p className='t-b-32 group-hover:underline mb-4'>
                {activity.title}
              </p>
              <p className='t-r-16 text-gray-6'>{activity.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
