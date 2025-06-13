import { useRef, useState, useEffect, useCallback } from 'react';
import type {
  UsersResponse,
  UserResponse,
  PatchUserRequest,
} from '@/types/admin/users';
import { InfiniteScrollResponse, MessageResponse } from '@/types';
import { getUsers, getUser, patchUser } from '@/apis/admin/users';
import UserModal from '@/components/admin/users/user/user-modal';
import { handleApiError } from '@/components/common/error-handler';
import { toast } from 'sonner';
import { useLoaderData } from 'react-router-dom';
import Search from '@/components/ui/search';

export default function AdminUserPage() {
  const loaderData = useLoaderData() as InfiniteScrollResponse<UsersResponse>;
  const [users, setUsers] = useState<UsersResponse[]>(loaderData.content);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [hasNext, setHasNext] = useState(loaderData.hasNext);
  const [lastId, setLastId] = useState(loaderData.lastId);
  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleEdit = async (
    form: PatchUserRequest
  ): Promise<MessageResponse> => {
    const { userNo, userId, userName, email, studentNo, role, userStatus } =
      form;
    const res = await patchUser(userNo, {
      userId,
      userName,
      email,
      studentNo,
      role,
      userStatus,
    });

    try {
      const updated = await getUsers();
      setUsers(updated.content);
    } catch (error) {
      toast.error(handleApiError(error));
    }

    setSelectedUser(null);
    return res;
  };

  const handleSelectUser = async (userNo: number) => {
    try {
      const userDetail = await getUser(userNo);
      setSelectedUser(userDetail);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleClose = () => setSelectedUser(null);

  const handleSearch = async () => {
    const response = await getUsers(searchValue.trim());
    setUsers(response.content);
  };

  const loadMoreUsers = useCallback(async () => {
    if (!hasNext) return;

    try {
      const response = await getUsers(searchValue, lastId);

      setUsers((prev) => [...prev, ...response.content]);
      setLastId(response.lastId);
      setHasNext(response.hasNext);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }, [hasNext, lastId]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const observerTarget = observerRef.current;

      if (!observerTarget) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (entry.isIntersecting && hasNext) {
            loadMoreUsers();
          }
        },
        {
          root: null,
          rootMargin: '20px',
          threshold: 0.1,
        }
      );

      observer.current.observe(observerTarget);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer.current) observer.current.disconnect();
    };
  }, [hasNext, loadMoreUsers, searchValue]);

  return (
    <div>
      {/* 검색 */}
      <Search
        placeholder='이름 검색'
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
        className='mb-[20px] border-btn-gray-d !bg-white rounded'
      />

      <div className='max-h-[100vw] md:max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded t-b-14 overflow-hidden divide-y divide-btn-gray-d'>
        {/* 헤더 */}
        <div className='sticky top-0 z-1 grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center text-nowrap bg-bg-gray-fa'>
          <div className='min-h-[44px] flex items-center justify-center'>
            No.
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            이름
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            아이디
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            학번
          </div>
        </div>

        {/* 회원 목록 */}
        {users.map((user, index) => (
          <div
            key={user.userNo}
            onClick={() => handleSelectUser(user.userNo)}
            className='grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {index + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {user.userName}
              </span>
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {user.userId}
              </span>
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {user.studentNo || '-'}
              </span>
            </div>
          </div>
        ))}
        <div className='w-full h-1 bg-bg-gray-fa' ref={observerRef} />
      </div>

      {/* 상세 모달 */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onEdit={handleEdit}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
