import { TABLE_MAP } from '@/constants/my-page/my-page';
import { MyPage as MyPageType } from '@/types/my-page';

export default function AccountTable({
  accountData,
}: {
  accountData: MyPageType;
}) {
  const renderMyData = (key: string) => {
    if (key === 'role') {
      return accountData.studentNo ? '미술치료학과 구성원' : '일반 회원';
    }

    return accountData[key as keyof MyPageType];
  };

  return (
    <div className='mb-[20px] w-full rounded-[5px] border border-muted bg-bg-gray-fa'>
      <table className='w-full table-fixed'>
        <tbody>
          {Object.entries(TABLE_MAP).map(([label, key]) => (
            <tr
              key={key}
              className='border-b-[1px] border-bg-gray-d last:border-b-0 md:h-[45px] h-[35px] hover:bg-primary/10'>
              <td className='t-b-16 rounded-[5px] title-b-14 text-center w-[80px] md:w-[250px] border-r-[1px] border-bg-gray-d'>
                {label}
              </td>

              <td className='text-gray rounded-[5px] text-r-14 md:text-r-16 px-4 md:px-[20px] truncate'>
                {renderMyData(key)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
