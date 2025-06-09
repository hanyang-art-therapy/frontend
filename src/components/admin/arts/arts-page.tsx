import { useState } from 'react';
import TabButton from '@/components/admin/tab-btn';
import AdminArtView from '@/components/admin/arts/art/art-view';
import AdminArtForm from '@/components/admin/arts/art/art-form';

export default function AdminArt() {
  const [selectedTab, setSelectedTab] = useState<'view' | 'form'>('view');

  return (
    <>
      <div className='fixed z-5 w-full pt-[100px] bg-white'>
        <h2 className='t-b-24'>작품 관리</h2>
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

      <div className='pt-[215px] min-h-[100vh]'>
        {selectedTab === 'view' && <AdminArtView />}
        {selectedTab === 'form' && <AdminArtForm />}
      </div>
    </>
  );
}
