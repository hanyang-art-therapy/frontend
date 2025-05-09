import { Skeleton } from '@/components/ui/skeleton';
import { QUICK_LINK } from '@/constants/main/quick-link';

export default function MainSkeleton() {
    return (
        <>
          {/* Hero Section Skeleton */}
          <section className="w-full h-[400px]">
            <Skeleton className="w-full h-full" />
          </section>

          {/* Quick Links Section Skeleton */}
          <section className="w-full flex justify-center">
            <ul className="quick-list">
              {QUICK_LINK.map((_, i) => (
                <li key={i} className="quick-skeleton-style">
                  <Skeleton className="w-full h-full"/>
                </li>
              ))}
            </ul>
          </section>
    
          {/* Contents Section Skeleton */}
          <section className="w-full h-[480px]">
            <Skeleton className="w-full h-full" />
          </section>
        </>
    );
}