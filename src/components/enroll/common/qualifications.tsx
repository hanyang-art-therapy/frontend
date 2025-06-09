import { Check } from 'lucide-react';

type QualificationsProps = {
  items: readonly string[];
};

// 지원 자격 내 리스트
export default function Qualifications({ items }: QualificationsProps) {
  return (
    <ul className='grid gap-4 sm:gap-0'>
      {items.map((item, index) => (
        <li
          key={item + index}
          className='flex items-center gap-3 px-0 sm:p-4 bg-gray-fa rounded-lg'
        >
          <div className='w-6 h-6 bg-success text-white rounded-full flex items-center justify-center'>
            <Check className='w-3 h-3' strokeWidth={4} />
          </div>
          <p className='t-m-16'>{item}</p>
        </li>
      ))}
    </ul>
  );
}
