import { getMyProfile } from '@/apis/my-page/profile';
import { getMyReviews } from '@/apis/my-page/reviews';
import MyPage from '@/components/my-page/my-page';
import { useAuthStore } from '@/store/auth';
import type { MyProfileData, MyReviewData } from '@/types/my-page';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [myReviews, setMyReviews] = useState<MyReviewData[]>([]);
  // const [myPosts, setMyPosts] = useState<MyPostData[]>([]);
  const [myProfile, setMyProfile] = useState<MyProfileData>(
    {} as MyProfileData
  );

  const userNo = useAuthStore((state) => state.userNo);

  useEffect(() => {
    if (!userNo) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [reviews, profile] = await Promise.all([
          getMyReviews(userNo),
          getMyProfile(userNo),
        ]);
        setMyReviews(reviews);
        setMyProfile(profile);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userNo]);

  return (
    <MyPage myProfile={myProfile} myReviews={myReviews} isLoading={isLoading} />
  );
}
