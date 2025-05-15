import { getMyPostsMocking } from '@/apis/my-page/posts';
import { getMyProfileMocking } from '@/apis/my-page/profile';
import { getMyReviewsMocking } from '@/apis/my-page/reviews';
import MyPage from '@/components/my-page/my-page';
import type { MyPostData, MyProfileData, MyReviewData } from '@/types/my-page';
import { useEffect, useState } from 'react';

export default function Page() {
  const [myReviews, setMyReviews] = useState<MyReviewData[]>([]);
  const [myPosts, setMyPosts] = useState<MyPostData[]>([]);
  const [myProfile, setMyProfile] = useState<MyProfileData>(
    {} as MyProfileData
  );

  useEffect(() => {
    const fetchMyReviews = async () => {
      const response = await getMyReviewsMocking();
      setMyReviews(response);
    };

    const fetchMyPosts = async () => {
      const response = await getMyPostsMocking();
      setMyPosts(response);
    };

    const fetchMyProfile = async () => {
      const response = await getMyProfileMocking();
      setMyProfile(response);
    };

    fetchMyReviews();
    fetchMyPosts();
    fetchMyProfile();
  }, []);

  return (
    <MyPage myProfile={myProfile} myReviews={myReviews} myPosts={myPosts} />
  );
}
