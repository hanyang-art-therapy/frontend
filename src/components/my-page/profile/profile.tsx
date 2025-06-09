import PatchProfileDialog from '@/components/my-page/profile/patch/patch-profile-dialog';
import ProfileActions from '@/components/my-page/profile/profile-actions';
import ProfileTable from '@/components/my-page/profile/profile-table';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import { useState } from 'react';
import type { MyProfileData } from '@/types/my-page';

export default function Profile({ myProfile }: { myProfile: MyProfileData }) {
  const [selectedProperty, setSelectedProperty] = useState<string>('이름');
  const [myProfileData, setMyProfileData] = useState<MyProfileData>(myProfile);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className='space-y-[30px]'>
      <MyPageHeader title='개인정보 관리' />
      <ProfileTable
        myProfile={myProfileData}
        setSelectedProperty={setSelectedProperty}
        setIsDialogOpen={setIsDialogOpen}
      />
      <PatchProfileDialog
        selectedProperty={selectedProperty}
        email={myProfile.email}
        userName={myProfile.userName}
        studentNo={myProfile.studentNo}
        setMyProfileData={setMyProfileData}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />

      <ProfileActions userId={myProfile.userId} />
    </div>
  );
}
