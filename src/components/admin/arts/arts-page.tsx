import AdminArtForm from '@/components/admin/arts/art/art-form';
import AdminArtView from '@/components/admin/arts/art/art-view';
import TabButton from '@/components/admin/tab-btn';

import { useState } from 'react';

export default function AdminArt() {
  const [selectedTab, setSelectedTab] = useState<'view' | 'form'>('view');

  return (
    <>
      <div className='fixed z-5 w-full pt-[100px] bg-white'>
        <h2 className='t-b-24'>작품 관리</h2>
        <div className='flex space-x-[10px] mt-[10px]'>
          <div className='flex gap-[10px] min-w-[150px]'>
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
      </div>

      <div className='pt-[215px]'>
        {selectedTab === 'view' && <AdminArtView />}
        {selectedTab === 'form' && (
          <AdminArtForm setSelectedTab={setSelectedTab} />
        )}
      </div>
    </>
  );
}
