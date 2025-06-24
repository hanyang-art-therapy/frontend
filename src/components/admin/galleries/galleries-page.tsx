import GalleryForm from '@/components/admin/galleries/gallery/gallery-form';
import GalleryView from '@/components/admin/galleries/gallery/gallery-view';
import TabButton from '@/components/admin/tab-btn';
import { useState } from 'react';
import type { TabType } from '@/components/admin/tab-btn';
import { GalleriesResponse } from '@/types/admin/galleries';
import { useLoaderData } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

export default function AdminGalleries() {
  const loaderData = useLoaderData();

  const { role } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<TabType>('view');
  // const [postedYears, setPostedYears] = useState<string[]>([]);
  const [galleries, setGalleries] = useState<GalleriesResponse[]>(loaderData);

  const content =
    selectedTab === 'view' ? (
      <GalleryView galleries={galleries} setGalleries={setGalleries} />
    ) : (
      <GalleryForm postedYears={[]} role={role} setGalleries={setGalleries} />
    );

  return (
    <>
      <div className='fixed z-5 w-full pt-[100px] bg-white'>
        <h2 className='t-b-24'>전시회 관리</h2>
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

      <div className='pt-[215px]'>{content}</div>
    </>
  );
}
