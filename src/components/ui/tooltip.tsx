import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

type ToolTipProps = {
  content: string;
  className?: string;
};

export default function ToolTip({ content, className }: ToolTipProps) {
  return (
    <AnimatePresence>
      <motion.div
        key='guide'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className={cn(
          className,
          'absolute -top-8 left-0 rounded-md bg-black text-white t-r-12 px-2 py-1 pointer-events-none transition-all'
        )}>
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
