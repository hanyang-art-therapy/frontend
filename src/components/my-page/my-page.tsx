import Account from '@/components/my-page/account/account';
import MyComments from '@/components/my-page/comment/my-comments';
import MyPosts from '@/components/my-page/post/my-posts';
import Step from '@/components/ui/step';
import { MY_PAGE_STEP_ITEMS } from '@/constants/my-page';
import type { MyComment, MyPage as MyPageType } from '@/types/my-page';
import { useState } from 'react';

type MyPageProps = {
  accountData: MyPageType;
  commentData: MyComment[];
};

export default function MyPage({ accountData, commentData }: MyPageProps) {
  const [step, setStep] = useState(MY_PAGE_STEP_ITEMS[0]);

  return (
    <>
      <Step items={MY_PAGE_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='w-full max-w-[1080px] mx-auto mt-15'>
        {/* 개인정보 관리 */}
        {step === MY_PAGE_STEP_ITEMS[0] && (
          <Account accountData={accountData} />
        )}

        {/* 게시물 관리 */}
        {step === MY_PAGE_STEP_ITEMS[1] && <MyPosts />}

        {/* 내가 쓴 댓글 관리 */}
        {step === MY_PAGE_STEP_ITEMS[2] && (
          <MyComments commentData={commentData} />
        )}
      </div>
    </>
  );
}
