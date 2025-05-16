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
    <h3 className='min-w-[280px] t-b-32 flex flex-col gap-[5px]'>
      <div className='flex items-center gap-3'>
        <Icon className='h-6 w-6 text-primary' />
        <p>{title}</p>
      </div>
      {subTitle && <p className='text-gray-6 t-m-18'>{subTitle}</p>}
    </h3>
  );
}
