import Profile from '@/components/my-page/profile/profile';
import { useLoaderData } from 'react-router-dom';

export default function MyPageProfile() {
  const myProfileData = useLoaderData();

  return <Profile myProfile={myProfileData} />;
}
