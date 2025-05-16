import { getMyProfile } from '@/apis/my-page/profile';
import { getMyReviews } from '@/apis/my-page/reviews';
import MyPage from '@/components/my-page/my-page';
import { useAuthStore } from '@/store/auth';
import type { MyProfileData, MyReviewData } from '@/types/my-page';
import { useEffect, useState } from 'react';

export default function Page() {
  const [myReviews, setMyReviews] = useState<MyReviewData[]>([]);
  // const [myPosts, setMyPosts] = useState<MyPostData[]>([]);
  const [myProfile, setMyProfile] = useState<MyProfileData>(
    {} as MyProfileData
  );

  const userNo = useAuthStore((state) => state.userNo);

  useEffect(() => {
    if (!userNo) return;
    const fetchMyReviews = async () => {
      const response = await getMyReviews(userNo);
      setMyReviews(response);
    };

    // const fetchMyPosts = async () => {
    //   const response = await getMyPostsMocking();
    //   setMyPosts(response);
    // };

    const fetchMyProfile = async () => {
      const response = await getMyProfile(userNo);
      setMyProfile(response);
    };

    fetchMyReviews();
    // fetchMyPosts();
    fetchMyProfile();
  }, []);

  return <MyPage myProfile={myProfile} myReviews={myReviews} />;
}
