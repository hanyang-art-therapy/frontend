import MyPosts from '@/components/my-page/post/my-posts';
import Profile from '@/components/my-page/profile/profile';
import MyReviews from '@/components/my-page/review/my-reviews';
import Step from '@/components/ui/step';
import { MY_PAGE_STEP_ITEMS } from '@/constants/my-page/my-page';
import type { MyPostData, MyProfileData, MyReviewData } from '@/types/my-page';
import { useState } from 'react';

type MyPageProps = {
  myProfile: MyProfileData;
  myReviews: MyReviewData[];
  myPosts: MyPostData[];
};

export default function MyPage({ myProfile, myReviews, myPosts }: MyPageProps) {
  const [reviews, posts, account] = MY_PAGE_STEP_ITEMS;
  const [step, setStep] = useState(reviews.value);

  return (
    <div className='pt-[60px] md:min-h-[calc(100vh-394px)]'>
      <Step items={MY_PAGE_STEP_ITEMS} step={step} setStep={setStep} />

      <div className='w-full md:max-w-[1260px] mx-auto md:mt-15 mt-10 px-5 md:px-0'>
        {/* 내가 쓴 리뷰 관리 */}
        {step === reviews.value && <MyReviews myReviews={myReviews} />}

        {/* 게시물 관리 */}
        {step === posts.value && <MyPosts myPosts={myPosts} />}

        {/* 개인정보 관리 */}
        {step === account.value && <Profile myProfile={myProfile} />}
      </div>
    </div>
  );
}
