import { useState } from 'react';
import TabButton from '@/components/admin/tab-btn';
import ArtistView from '@/components/admin/artists/artist/artist-view';
import ArtistForm from '@/components/admin/artists/artist/artist-form';

import type { TabType } from '@/components/admin/tab-btn';

export default function AdminArtist() {
  const [selectedTab, setSelectedTab] = useState<TabType>('view');

  const content = selectedTab === 'view' ? <ArtistView /> : <ArtistForm />;

  return (
    <>
      <div className='fixed z-5 w-full pt-[100px] bg-white'>
        <h2 className='t-b-24'>작가 관리</h2>
        <div className='flex space-x-[10px] mt-[10px]'>
          <TabButton
            isSelected={selectedTab === 'view'}
            onSelect={() => setSelectedTab('view')}
          >
            조회
          </TabButton>
          <TabButton
            isSelected={selectedTab === 'form'}
            onSelect={() => setSelectedTab('form')}
          >
            등록
          </TabButton>
        </div>
      </div>

      <div className='pt-[215px] min-h-[100vh]'>{content}</div>
    </>
  );
}
