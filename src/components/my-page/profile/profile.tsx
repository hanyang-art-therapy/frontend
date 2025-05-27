import ProfileActions from '@/components/my-page/profile/profile-actions';
import ProfileTable from '@/components/my-page/profile/profile-table';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import type { MyProfileData } from '@/types/my-page';

export default function Profile({ myProfile }: { myProfile: MyProfileData }) {
  return (
    <>
      <MyPageHeader title='개인정보 관리' />
      <ProfileTable myProfile={myProfile} />
      <ProfileActions />
    </>
  );
}
