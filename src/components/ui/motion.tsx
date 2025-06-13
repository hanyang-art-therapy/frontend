import { motion } from 'motion/react';
import { Children, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
};

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  distance = 30,
}: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: 'easeOut',
          delay,
        },
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.section>
  );
}

type StaggeredListProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  itemClassName?: string;
};

export function StaggeredList({
  children,
  className = '',
  staggerDelay = 0.1,
  itemClassName = '',
}: StaggeredListProps) {
  const customStaggerContainer = {
    ...staggerContainer,
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.ul
      className={className}
      variants={customStaggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.1 }}
    >
      {Children.map(children, (child, index) => (
        <motion.li key={index} variants={staggerItem} className={itemClassName}>
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.li
      className={cn('list-none', className)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: 'easeOut',
          delay,
        },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.li>
  );
}
