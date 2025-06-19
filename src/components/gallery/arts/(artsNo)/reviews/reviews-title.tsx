export default function ReviewsTitle({
  commentsLength,
}: {
  commentsLength: number;
}) {
  return (
    <h2 className='t-b-24 text-left'>
      {commentsLength > 0 && (
        <>
          <span className='text-bg-primary ml-2'>{commentsLength}</span>
          <span>개의</span>{' '}
        </>
      )}
      작품 리뷰
    </h2>
  );
}
