function ReviewNoResult() {
  return (
    <div className='w-[1260px] mx-auto flex flex-col items-center justify-center py-16 text-center bg-gray-50 border border-gray-200 rounded-lg'>
      <h3 className='text-2xl font-semibold text-gray-800'>
        댓글을 찾을 수 없습니다.
      </h3>
      <p className='mt-4 text-lg text-gray-500'>
        이 작품에 대한 댓글이 아직 없습니다. 첫 번째 댓글을 남겨보세요!
      </p>
      <div className='mt-8'>
        <button className='px-6 py-2 text-white bg-muted rounded-md hover:bg-bg-primary transition-all cursor-pointer'>
          첫 번째 댓글 남기기
        </button>
      </div>
    </div>
  );
}

export default ReviewNoResult;
