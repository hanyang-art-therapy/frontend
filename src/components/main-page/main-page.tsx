import MainSkeleton from '@/components/main-page/main-skeleton';
import { lazy, Suspense } from 'react';

const HeroSection = lazy(
  () => import('@/components/main-page/sections/hero-section')
);

const QuickLinksSection = lazy(
  () => import('@/components/main-page/sections/quick-link-section')
);

const ContentsSection = lazy(
  () => import('@/components/main-page/sections/contents-section')
);

export default function MainPage() {
  return (
    <Suspense fallback={<MainSkeleton />}>
      <HeroSection />
      <QuickLinksSection />
      <ContentsSection />
    </Suspense>
  );
}