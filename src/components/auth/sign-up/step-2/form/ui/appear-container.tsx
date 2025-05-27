import { cn } from '@/lib/utils';

export default function AppearContainer({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn('flex appear-section', show && 'appear-section--visible')}>
      {children}
    </div>
  );
}
