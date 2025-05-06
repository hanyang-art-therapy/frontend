// NEED CODE SPLITTING

import Account from '@/components/my-page/account/account';
import MyPosts from '@/components/my-page/post/my-posts';
import MyReview from '@/components/my-page/review/my-review';
import Step from '@/components/ui/step';
import { MY_PAGE_STEP_ITEMS } from '@/constants/my-page';
import type { MyPage as MyPageType } from '@/types/my-page';
import { useState } from 'react';

type MyPageProps = {
  accountData: MyPageType;
};

export default function MyPage({ accountData }: MyPageProps) {
  const [step, setStep] = useState(MY_PAGE_STEP_ITEMS[0]);

  return (
    <div className='mt-15'>
      <Step items={MY_PAGE_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='w-full max-w-[1080px] mx-auto mt-15'>
        {/* 내가 쓴 리뷰 관리 */}
        {step === MY_PAGE_STEP_ITEMS[0] && <MyReview />}

        {/* 게시물 관리 */}
        {step === MY_PAGE_STEP_ITEMS[1] && <MyPosts />}

        {/* 개인정보 관리 */}
        {step === MY_PAGE_STEP_ITEMS[2] && (
          <Account accountData={accountData} />
        )}
      </div>
    </div>
  );
}
