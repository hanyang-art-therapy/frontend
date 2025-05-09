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
            <ul className="w-full max-w-[1160px] flex justify-between py-[60px] px-[20px] xl:px-0">
              {QUICK_LINK.map((_, i) => (
                <li key={i}>
                  <Skeleton className="quick-skeleton-style"/>
                </li>
              ))}
            </ul>
          </section>
    
          {/* Contents Section Skeleton */}
          <section className="w-full h-[460px] bg-gray-50 rounded-md">
            <Skeleton className="w-full h-full" />
          </section>
        </>
    );
}