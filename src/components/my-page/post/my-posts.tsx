import { getMyPosts } from '@/apis/my-page/posts';
import MyPostList from '@/components/my-page/post/my-post-list';
import MyPostNoResult from '@/components/my-page/post/my-post-no-result';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import Pagination from '@/components/ui/pagination';
import type { PaginationResponse } from '@/types';
import type { MyPostData } from '@/types/my-page';
import { useEffect, useState } from 'react';

export default function MyPosts({
  myPosts,
}: {
  myPosts: PaginationResponse<MyPostData> | null;
}) {
  const [searchedPosts, setSearchedPosts] =
    useState<PaginationResponse<MyPostData> | null>(null);

  useEffect(() => {
    if (myPosts?.content) {
      setSearchedPosts(myPosts);
    }
  }, [myPosts]);

  const handlePageChange = async (page: number) => {
    const response = await getMyPosts({
      page,
    });

    setSearchedPosts(response);
  };

  if (searchedPosts === null || searchedPosts?.content.length)
    return <MyPostNoResult />;

  return (
    <>
      <MyPageHeader title='나의 게시글 관리' />
      <MyPostList myPosts={searchedPosts} />
      <Pagination
        currentPage={searchedPosts?.page || 1}
        totalPages={searchedPosts?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </>
  );
}
