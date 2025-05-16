import { cn } from '@/lib/utils';

type GallerytherapyContentTitleProps = {
  firstTitle: string;
  secondTitle: string;
  strong: 'first' | 'second';
};

export default function GallerytherapyContentTitle({
  firstTitle,
  secondTitle,
  strong,
}: GallerytherapyContentTitleProps) {
  return (
    <div className='mb-12 text-center'>
      <h2 className='mb-2 t-b-32'>
        <span
          className={cn('text-black', strong === 'first' && 'text-primary')}>
          {firstTitle}{' '}
        </span>
        <span
          className={cn('text-black', strong === 'second' && 'text-primary')}>
          {secondTitle}
        </span>
      </h2>
      <div className='mx-auto h-1 w-20 md:w-24 bg-primary'></div>
    </div>
  );
}
