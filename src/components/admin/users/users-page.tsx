import UserView from '@/components/admin/users/user/user-view';

export default function AdminUser() {
  return (
    <>
      {/* 타이틀 */}
      <div className='fixed z-5 w-full pt-[100px] bg-white'>
        <h2 className='t-b-24'>회원 조회</h2>
      </div>
      {/* 컨텐츠 */}
      <div className='pt-[150px] min-h-[100vh]'>
        <UserView />
      </div>
    </>
  );
}
