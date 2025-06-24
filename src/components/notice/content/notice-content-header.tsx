import { Volume2 } from 'lucide-react';

export default function NoticeListHeader() {
  return (
    <div className='flex flex-col justify-start items-start w-full xl:px-0'>
      <div className='flex justify-start items-center pb-[20px] gap-2 w-full text-start'>
        <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center items-center text-white bg-secondary'>
          <Volume2 size={30} strokeWidth={2} />
        </div>
        <strong className='p-2 text-bg-black t-b-32'>공지사항</strong>
      </div>
      <div className='p-4 bg-bg-gray-fa rounded t-r-16 flex-1 w-full'>
        본 게시판은 미술치료학과의 학사, 실습, 전시, 행사 등과 관련된 주요
        공지사항을 안내합니다. 일정 확인 및 필수 제출 서류 등은 수시로
        확인해주세요.
      </div>
    </div>
  );
}
