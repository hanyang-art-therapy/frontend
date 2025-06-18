import type { ReactNode } from 'react';

type ReviewsModalActionsButtonProps = {
  icon: ReactNode;
  name: string;
  onClick: () => void;
};

export default function ReviewsModalActionsButton({
  icon,
  name,
  onClick,
}: ReviewsModalActionsButtonProps) {
  return (
    <button
      onClick={onClick}
      className='flex flex-col items-center gap-1 group cursor-pointer'
    >
      <span className='t-r-14 text-white group-hover:underline'>{name}</span>
      <div className='flex items-center gap-2 transition-all duration-200 group-hover:scale-105 bg-bg-gray-fa p-2 rounded-full'>
        {icon}
      </div>
    </button>
  );
}
