import { refresh } from '@/apis/auth/refresh';
import { myPostsLoader } from '@/routes/loaders/my-page/posts';
import { myProfileLoader } from '@/routes/loaders/my-page/profile';
import { myReviewsLoader } from '@/routes/loaders/my-page/reviews';
import { redirect } from 'react-router-dom';
import { toast } from 'sonner';

const myPageLoader = async () => {
  try {
    await refresh();

    return null;
  } catch (error) {
    console.error(error);
    toast.error('로그인이 필요합니다.');
    return redirect('/sign-in');
  }
};

export { myPageLoader, myPostsLoader, myProfileLoader, myReviewsLoader };
