import { refresh } from '@/apis/auth/refresh';
import { handleApiError } from '@/components/common/error-handler';
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
    toast.error(handleApiError(error));
    return redirect('/sign-in');
  }
};

export { myPageLoader, myPostsLoader, myProfileLoader, myReviewsLoader };
