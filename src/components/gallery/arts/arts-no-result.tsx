import { Palette, Lightbulb, CircleAlert } from 'lucide-react';

export default function ArtsNoResult() {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-6 text-center'>
      <div className='relative mb-8'>
        <div className='w-24 h-24 rounded-full bg-btn-gray-fa flex items-center justify-center mb-4'>
          <Palette className='w-12 h-12 text-primary' />
        </div>
        <div className='absolute -top-2 -right-2 w-8 h-8  flex items-center justify-center'>
          <CircleAlert className='w-6 h-6 text-destructive' />
        </div>
      </div>

      <h3 className='t-m-24 mb-2 underline'>검색 결과가 없습니다</h3>

      <p className='t-r-16 mb-6 max-w-md leading-relaxed'>
        선택하신 조건에 맞는 작품을 찾을 수 없습니다.
        <br />
      </p>

      <div className='bg-btn-gray-fa rounded-lg p-4 max-w-md'>
        <h4 className='t-m-18 mb-4 flex items-center justify-center gap-2'>
          검색 팁 <Lightbulb className='w-4 h-4 text-primary' />
        </h4>
        <ul className='t-r-12 text-gray-600 space-y-1 text-left'>
          <li>• 다른 연도나 기수를 선택해보세요</li>
          <li>• 검색 필터를 초기화해보세요</li>
        </ul>
      </div>
    </div>
  );
}
