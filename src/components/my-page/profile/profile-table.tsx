import { Button } from '@/components/ui/button';
import { TABLE_MAP } from '@/constants/my-page/my-page';
import type { MyProfileData } from '@/types/my-page';
import type { Dispatch, SetStateAction } from 'react';

type ProfileTableProps = {
  myProfile: MyProfileData;
  setSelectedProperty: Dispatch<SetStateAction<string>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ProfileTable({
  myProfile,
  setSelectedProperty,
  setIsDialogOpen,
}: ProfileTableProps) {
  const renderMyData = (key: string) => {
    if (key === 'role') {
      return myProfile.studentNo ? '미술치료학과 구성원' : '일반 회원';
    }

    return myProfile[key as keyof MyProfileData] || '-';
  };

  const isChangeable = (key: string) => {
    return key === 'userName' || key === 'email' || key === 'studentNo';
  };

  const handlePatchButtonClick = (key: string) => {
    if (!isChangeable(key)) return;

    setSelectedProperty(key);
    setIsDialogOpen(true);
  };

  return (
    <div className='mb-[20px] w-full rounded-[5px] border border-bg-gray-d  box-shadow-style'>
      <table className='w-full table-fixed'>
        <tbody>
          {TABLE_MAP.map(({ label, key }) => (
            <tr
              key={key}
              className='border-b-[1px] border-bg-gray-d last:border-b-0 h-[45px] bg-bg-gray-fa cursor-not-allowed'
            >
              <td className='t-b-14 rounded-[5px] text-center sm:w-[120px] w-[80px] md:w-[250px] border-r-[1px] border-bg-gray-d'>
                {label}
              </td>

              <td className='rounded-[5px] flex justify-between items-center t-r-16 px-2 sm:px-4 truncate py-2 h-[45px]'>
                <span className='truncate'>{renderMyData(key)}</span>

                {isChangeable(key) && (
                  <Button
                    size='sm'
                    className='t-r-16'
                    onClick={() => handlePatchButtonClick(key)}
                  >
                    수정
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
