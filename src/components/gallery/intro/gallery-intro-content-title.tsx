import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent } from 'react';

type GalleryIntroTitleProps = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
};

export default function GalleryIntroContentTitle({
  icon: Icon,
  title,
}: GalleryIntroTitleProps) {
  return (
    <h3 className='text-2xl font-bold mb-4 flex items-center gap-2'>
      <Icon className='h-5 w-5 text-primary' />
      {title}
    </h3>
  );
}
