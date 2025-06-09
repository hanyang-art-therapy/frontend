export default function NoticeNoData() {
  return (
    <div className='flex flex-col items-center justify-start text-start'>
      {/* 제목 */}
      <div className='w-full h-[200px] xl:px-0 border-t-1 border-b-1 py-[10px] border-t-gray-300 border-b-gray-300 bg-white flex justify-center items-center'>
        <div className='flex gap-4 mt-2 px-[20px] text-btn-gray-9'>
          현재 게시된 공지사항이 없습니다.
        </div>
      </div>
    </div>
  );
}
