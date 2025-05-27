import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

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
    <div className='inline-block mb-[30px] text-center mx-auto'>
      <h2 className='mb-2 t-b-32'>
        <span className={cn(strong === 'first' && 'text-primary')}>
          {firstTitle}{' '}
        </span>
        <span className={cn(strong === 'second' && 'text-primary')}>
          {secondTitle}
        </span>
      </h2>

      <motion.div
        className='mx-auto h-1 w-20 md:w-24 bg-primary'
        initial={{ width: 0, left: 0 }}
        whileInView={{ width: '100%', left: '50%' }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      />
    </div>
  );
}
