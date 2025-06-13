import { getMyReviews } from '@/apis/my-page/reviews';
import MyReviewList from '@/components/my-page/review/my-review-list';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import Search from '@/components/ui/search';
import type { MyReviewPagination } from '@/types';
import type { MyReviewData } from '@/types/my-page';
import { useState, useEffect } from 'react';
import Pagination from '@/components/ui/pagination';
import MyReviewNoResult from './my-review-no-result';

type MyReviewsProps = {
  myReviews: MyReviewPagination<MyReviewData> | null;
};

export default function MyReveiws({ myReviews }: MyReviewsProps) {
  const [searchValue, setSearchValue] = useState('');
  const [searchedReviews, setSearchedReviews] =
    useState<MyReviewPagination<MyReviewData> | null>(null);

  useEffect(() => {
    if (myReviews?.content) {
      setSearchedReviews(myReviews);
    }
  }, [myReviews]);

  const handleSearch = async () => {
    const response = await getMyReviews({
      page: myReviews?.page,
      keyword: searchValue,
    });

    setSearchedReviews(response);
  };

  const handlePageChange = async (page: number) => {
    const response = await getMyReviews({
      page,
      keyword: searchValue,
    });

    setSearchedReviews(response);
  };

  if (!myReviews || searchedReviews === null || !searchedReviews.content.length)
    return <MyReviewNoResult />;

  return (
    <div className='space-y-[30px]'>
      <MyPageHeader title='내가 쓴 리뷰 관리' />
      <Search
        placeholder='댓글 검색'
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <MyReviewList myReviews={searchedReviews} />
      <Pagination
        currentPage={searchedReviews?.page || 1}
        totalPages={searchedReviews?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
