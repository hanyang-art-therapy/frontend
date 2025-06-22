import LazySkeleton from '@/components/common/lazy-skeleton';
import { type JSX, type LazyExoticComponent, Suspense } from 'react';

export default function lazyElement(
  Element: LazyExoticComponent<() => JSX.Element>
) {
  return (
    <Suspense fallback={<LazySkeleton />}>
      <Element />
    </Suspense>
  );
}
