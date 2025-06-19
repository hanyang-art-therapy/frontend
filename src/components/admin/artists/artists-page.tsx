import TabButton from '@/components/admin/tab-btn';
import ArtistView from '@/components/admin/artists/artist/artist-view';
import ArtistForm from '@/components/admin/artists/artist/artist-form';
import type { TabType } from '@/components/admin/tab-btn';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ArtistsResponse } from '@/types/admin/artists';
import { InfiniteScrollResponse } from '@/types';
import { useAuthStore } from '@/store/auth';
import { getArtistsTest } from '@/apis/admin/artists';

export default function AdminArtist() {
  const { role } = useAuthStore();
  let loaderData = useLoaderData();
  const [artistsList, setArtistsList] =
    useState<InfiniteScrollResponse<ArtistsResponse>>(loaderData);

  const [selectedTab, setSelectedTab] = useState<TabType>('view');

  const content =
    selectedTab === 'view' ? (
      <ArtistView
        artistsList={artistsList}
        setArtistsList={setArtistsList}
        role={role}
      />
    ) : (
      <ArtistForm setArtistsList={setArtistsList} />
    );

  useEffect(() => {
    const fetchData = async () => {
      if (role === 'TESTER') {
        const response = await getArtistsTest({});
        setArtistsList(response as InfiniteScrollResponse<ArtistsResponse>);
      }
    };
    fetchData();
  }, []);

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

      <div className='pt-[215px]'>{content}</div>
    </>
  );
}
