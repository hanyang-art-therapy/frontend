import LazySkeleton from '@/components/common/lazy-skeleton';
import { type JSX, type LazyExoticComponent, Suspense } from 'react';

type LazyElementProps = {
  Element: LazyExoticComponent<() => JSX.Element>;
  fallback?: React.ReactNode;
};

export default function lazyElement({
  Element,
  fallback = <LazySkeleton />,
}: LazyElementProps) {
  return (
    <Suspense fallback={fallback}>
      <Element />
    </Suspense>
  );
}
