import { useEffect, useState } from 'react';
import TabButton from '@/components/admin/tab-btn';
import GalleryView from '@/components/admin/galleries/gallery/gallery-view';
import GalleryForm from '@/components/admin/galleries/gallery/gallery-form';

import type { TabType } from '@/components/admin/tab-btn';
import { getGalleries } from '@/apis/admin/galleries';
import { GalleriesResponse } from '@/types/admin/galleries';
import { handleApiError } from '@/components/common/error-handler';
import { toast } from 'sonner';

export default function AdminGalleries() {
  const [selectedTab, setSelectedTab] = useState<TabType>('view');
  const [postedYears, setPostedYears] = useState<string[]>([]);
  const [galleries, setGalleries] = useState<GalleriesResponse[]>([]);

  const content =
    selectedTab === 'view' ? (
      <GalleryView galleries={galleries} setGalleries={setGalleries} />
    ) : (
      <GalleryForm postedYears={postedYears} />
    );

  useEffect(() => {
    try {
      const fetchGalleries = async () => {
        const galleries = await getGalleries();

        setGalleries(galleries);

        setPostedYears(
          galleries.map((gallery) => gallery.startDate.split('-')[0])
        );
      };

      fetchGalleries();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }, [selectedTab]);

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
