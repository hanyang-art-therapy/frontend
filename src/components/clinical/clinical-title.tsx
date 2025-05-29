import { CLINICAL_ACTIVITIES } from '@/constants/clinical/clinical';
import { cn } from '@/lib/utils';
import { Palette } from 'lucide-react';

export default function ClinicalTitle({ category }: { category: string }) {
  const activity = CLINICAL_ACTIVITIES.find(
    (activity) => activity.id === category
  );

  const IconComponent = activity?.icon ?? Palette;

  return (
    <div className='flex items-center gap-4 mb-15'>
      <div
        className={cn(
          'p-3 rounded-[5px] text-white',
          activity?.color ?? 'bg-black'
        )}
      >
        <IconComponent className='h-6 w-6' />
      </div>
      <h1 className='t-b-32'>{activity?.title}</h1>
    </div>
  );
}
