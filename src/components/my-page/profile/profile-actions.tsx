import { Link } from 'react-router-dom';

export default function AccountActions() {
  return (
    <div className='md:mt-[15px] justify-end t-m-14 md:mr-[20px] flex gap-[15px] md:gap-[30px] md:pr-0 pr-4 '>
      <Link
        to='/my-page/reset-pw'
        className='text-gray-3 underline cursor-pointer'>
        비밀번호 변경
      </Link>
      <a className='text-gray-6 underline cursor-pointer'>회원 탈퇴</a>
    </div>
  );
}
