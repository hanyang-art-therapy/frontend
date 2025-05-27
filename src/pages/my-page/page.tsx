import { getMyPosts } from '@/apis/my-page/posts';
import { getMyProfile } from '@/apis/my-page/profile';
import { getMyReviews } from '@/apis/my-page/reviews';
import MyPage from '@/components/my-page/my-page';
import { useAuthStore } from '@/store/auth';
import type { MyPostData, MyProfileData, MyReviewData } from '@/types/my-page';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const navigate = useNavigate();

  const { accessToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [myReviews, setMyReviews] = useState<MyReviewData[]>([]);
  const [myPosts, setMyPosts] = useState<MyPostData[]>([]);
  const [myProfile, setMyProfile] = useState<MyProfileData>(
    {} as MyProfileData
  );

  useEffect(() => {
    if (!accessToken) {
      navigate(-1);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [reviews, posts, profile] = await Promise.all([
          getMyReviews(),
          getMyPosts(),
          getMyProfile(),
        ]);
        setMyReviews(reviews);
        setMyPosts(posts);
        setMyProfile(profile);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MyPage
      myReviews={myReviews}
      myPosts={myPosts}
      myProfile={myProfile}
      isLoading={isLoading}
    />
  );
}
