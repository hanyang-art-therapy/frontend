import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserResponse, PatchUserRequest } from '@/types/admin/users';
import UserModal from '@/components/admin/users/user/user-modal';

export default function UserList() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  // [PATCH] 수정 요청
  const handleEdit = (form: PatchUserRequest) => {
    setUsers((prev) =>
      prev.map((u) => (u.userNo === form.userNo ? { ...u, ...form } : u))
    );
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/admin/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <div className='w-full h-[45px] flex items-center mb-[30px] border border-btn-gray-d rounded overflow-hidden'>
        <p className='pl-[20px]'>Search(임시)</p>
      </div>
      <div className='max-h-[400px] border border-btn-gray-d rounded divide-y divide-btn-gray-d t-b-14 overflow-hidden flex flex-col'>
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
        <div className='overflow-y-auto divide-y divide-btn-gray-d'>
          {users.map((user, i) => (
            <div
              key={user.userNo}
              className='grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
              onClick={() => setSelectedUser(user)}
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
      </div>
      {/* 회원 상세 목록 모달창 */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}
