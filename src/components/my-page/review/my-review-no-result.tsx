import { Button } from '@/components/ui/button';

export default function MyReviewNoResult() {
  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center gap-8'>
      <p className='t-m-18'>작성한 댓글이 존재하지 않습니다</p>
      <Button>첫 댓글 작성하러 가기</Button>
    </div>
  );
}
