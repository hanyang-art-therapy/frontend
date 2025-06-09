export default function NoticeNoResult() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start text-start mt-[120px]'>
      {/* 제목 */}
      <div className='w-full h-[600px] xl:px-0 border-t-2 border-b-2 py-[10px] border-t-gray-300 border-b-gray-300 bg-white flex justify-center items-center'>
        <div className='flex gap-4 mt-2 px-[20px] text-btn-gray-9'>
          게시글을 찾을 수 없습니다.
        </div>
      </div>
    </div>
  );
}
