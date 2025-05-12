import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent } from 'react';

type GalleryIntroTitleProps = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  subTitle?: string;
};

export default function GalleryIntroContentTitle({
  icon: Icon,
  title,
  subTitle,
}: GalleryIntroTitleProps) {
  return (
    <h3 className='t-b-24 flex flex-col gap-1'>
      <div className='flex items-center gap-3'>
        <Icon className='h-5 w-5 text-primary' />
        <p>{title}</p>
      </div>
      {subTitle && <p className='text-muted t-m-18'>{subTitle}</p>}
    </h3>
  );
}
