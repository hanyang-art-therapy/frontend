import { ReactNode } from 'react';

type ArtInfoItemProps = {
  label: string;
  children: ReactNode;
};

export default function ArtInfoItem({ label, children }: ArtInfoItemProps) {
  return (
    <div className='flex w-full items-center gap-4'>
      <span className='min-w-[60px] bg-gray-9 text-white t-r-16 rounded-sm'>
        {label}
      </span>
      <span className='t-b-18 leading-[20px] text-left'>{children}</span>
    </div>
  );
}
