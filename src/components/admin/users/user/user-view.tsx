import { useEffect, useState } from 'react';
import type { UserResponse, PatchUserRequest } from '@/types/admin/users';
import { getUsers, patchUser } from '@/apis/admin/users';
import UserModal from '@/components/admin/users/user/user-modal';

export default function AdminUserPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const handleEdit = async (form: PatchUserRequest) => {
    const { userNo, userId, userName, email, studentNo, role, userStatus } =
      form;
    await patchUser(userNo, {
      userId,
      userName,
      email,
      studentNo,
      role,
      userStatus,
    });
    await getUsers().then((users) => setUsers(users));
    setSelectedUser(null);
  };

  const handleClose = () => setSelectedUser(null);

  return (
    <div>
      {/* 검색 */}
      <div className='w-full h-[45px] flex items-center mb-[20px] border border-btn-gray-d rounded overflow-hidden'>
        <p className='pl-[20px]'>Search(임시)</p>
      </div>
      <div className='max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded t-b-14 overflow-hidden divide-y divide-btn-gray-d'>
        {/* 회원 목록 헤더 */}
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
            이메일
          </div>
        </div>
        {/* 회원 목록 */}
        {users.map((user, i) => (
          <div
            key={user.userNo}
            onClick={() => setSelectedUser(user)}
            className='grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {i + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {user.userName}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {user.userId}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {user.email}
            </div>
          </div>
        ))}
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
