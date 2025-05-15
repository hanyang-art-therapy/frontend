export default function ReviewsTitle({
  commentsLength,
}: {
  commentsLength: number;
}) {
  return (
    <h2 className='text-[20px] font-bold text-left'>
      미술관 미술치료
      {commentsLength > 0 && (
        <span className='text-bg-primary ml-2'>({commentsLength})</span>
      )}
    </h2>
  );
}
