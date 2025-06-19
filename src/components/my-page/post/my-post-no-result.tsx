export default function MyPostNoResult() {
  return (
    <div className='flex min-h-screen-vh flex-col items-center justify-center gap-8'>
      <img
        src='/images/404.png'
        alt='404 Error'
        className='mx-auto md:w-[213px] w-[150px] h-auto'
      />
      <p className='t-m-24'>작성한 게시글이 존재하지 않습니다</p>
    </div>
  );
}
