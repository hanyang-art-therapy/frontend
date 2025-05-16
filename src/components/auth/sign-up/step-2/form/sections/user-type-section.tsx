import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Required from '@/components/ui/required';
import type { UserType } from '@/types/auth/sign-up';

type UserTypeSectionProps = {
  userType: UserType;
  setUserType: (value: UserType) => void;
};

export default function UserTypeSection({
  userType,
  setUserType,
}: UserTypeSectionProps) {
  const handleUserTypeChange = (value: UserType) => {
    setUserType(value);
  };

  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray-d'>
      <div className='t-b-16 flex items-center'>
        구분 <Required nbsp />
      </div>

      <RadioGroup
        defaultValue={userType}
        onValueChange={handleUserTypeChange}
        className='flex gap-[30px]'>
        <div className='flex items-center gap-2'>
          <RadioGroupItem value='member' id='member' />
          <label htmlFor='member' className='t-r-16 cursor-pointer'>
            미술치료학과 구성원
          </label>
        </div>

        <div className='flex items-center gap-2'>
          <RadioGroupItem value='general' id='general' />
          <label htmlFor='general' className='t-r-16 cursor-pointer'>
            일반인
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
