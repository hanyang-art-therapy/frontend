import { TABLE_MAP } from '@/constants/my-page';
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
    <div className='mb-[20px]w-full mx-auto rounded-[5px] border border-muted bg-bg-muted shadow-lg'>
      <table className='w-full border-collapse'>
        <tbody>
          {Object.entries(TABLE_MAP).map(([label, key]) => (
            <tr
              key={key}
              className='border-b-[1px] border-bg-gray last:border-b-0 md:h-[45px] transition-colors hover:bg-orange-50'>
              <td className='text-black font-bold text-center md:w-[250px] border-r-[1px] border-bg-gray'>
                {label}
              </td>

              <td className='text-gray pl-[20px]'>{renderMyData(key)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
