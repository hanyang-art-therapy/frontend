import MyReviews from '@/components/my-page/review/my-reviews';
import { useLoaderData } from 'react-router-dom';

export default function MyPageReviews() {
  const myReviews = useLoaderData();

  return <MyReviews myReviews={myReviews} />;
}
