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
            <ul className="w-[1080px] flex justify-between py-[60px]">
              {QUICK_LINK.map((_, i) => (
                <li key={i} className="flex flex-col items-center space-y-3">
                  <Skeleton className="quick-skeleton-style" />
                </li>
              ))}
            </ul>
          </section>
    
          {/* Contents Section Skeleton */}
          <section className="w-full h-[420px] bg-gray-50 rounded-md">
            <Skeleton className="w-full h-full" />
          </section>
        </>
    );
}