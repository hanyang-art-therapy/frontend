import WithdrawDialog from '@/components/my-page/profile/withdraw/withdraw-dialog';
import { Link } from 'react-router-dom';

type ProfileActionsProps = {
  userId: string;
};

export default function ProfileActions({ userId }: ProfileActionsProps) {
  return (
    <div className='md:mt-[15px] justify-end items-center t-m-14 md:mr-[20px] flex gap-[15px] md:pr-0 pr-4 '>
      <Link
        to={`/my-page/profile/reset-pw?userId=${userId}`}
        className='text-gray-3 underline cursor-pointer t-r-16'
      >
        비밀번호 변경
      </Link>

      <WithdrawDialog />
    </div>
  );
}
