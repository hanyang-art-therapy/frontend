import NoticeListHeader from '@/components/notice/content/notice-content-header';
import NoticeList from '@/components/notice/content/notice-list';
import NoticeSearch from '@/components/notice/notice-search/notice-search';
import { GetNoticesResponse } from '@/types/notice/notice';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function NoticeContent() {
  const loaderData = useLoaderData();

  const [filter, setFilter] = useState('일반');
  const [searchValue, setSearchValue] = useState('');
  const [notices, setNotices] = useState<GetNoticesResponse>(loaderData);

  return (
    <div className='min-h-screen-vh mt-[10px] md:mt-[30px] flex flex-col items-center justify-start'>
      <NoticeListHeader />

      <div className='w-full text-center'>
        <NoticeSearch
          filter={filter}
          searchValue={searchValue}
          setFilter={setFilter}
          setSearchValue={setSearchValue}
          setNotices={setNotices}
        />
        <NoticeList
          notices={notices}
          filter={filter}
          searchValue={searchValue}
          setNotices={setNotices}
        />
      </div>
    </div>
  );
}
