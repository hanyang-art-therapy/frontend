import ArtistForm from '@/components/admin/artists/artist/artist-form';
import ArtistView from '@/components/admin/artists/artist/artist-view';
import type { TabType } from '@/components/admin/tab-btn';
import TabButton from '@/components/admin/tab-btn';
import { useAuthStore } from '@/store/auth';
import { InfiniteScrollResponse } from '@/types';
import { ArtistsResponse } from '@/types/admin/artists';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function AdminArtist() {
  const { role } = useAuthStore();

  const loaderData = useLoaderData();

  const [artistsList, setArtistsList] =
    useState<InfiniteScrollResponse<ArtistsResponse>>(loaderData);

  const [selectedTab, setSelectedTab] = useState<TabType>('view');

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

      <div className='pt-[215px]'>
        {selectedTab === 'view' ? (
          <ArtistView
            artistsList={artistsList}
            setArtistsList={setArtistsList}
            role={role}
          />
        ) : (
          <ArtistForm setArtistsList={setArtistsList} role={role} />
        )}
      </div>
    </>
  );
}
