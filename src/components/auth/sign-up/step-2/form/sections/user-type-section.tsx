import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Required from '@/components/ui/required';

type UserTypeSectionProps = {
  userType: string;
  setUserType: (value: string) => void;
};

export default function UserTypeSection({
  userType,
  setUserType,
}: UserTypeSectionProps) {
  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray'>
      <div className='title-b-16 flex items-center'>
        구분 <Required nbsp />
      </div>

      <RadioGroup
        defaultValue={userType}
        onValueChange={setUserType}
        className='flex gap-[30px]'>
        <div className='flex items-center gap-2'>
          <RadioGroupItem value='member' id='member' />
          <label htmlFor='member' className='text-r-16 cursor-pointer'>
            미술치료학과 구성원
          </label>
        </div>

        <div className='flex items-center gap-2'>
          <RadioGroupItem value='general' id='general' />
          <label htmlFor='general' className='text-r-16 cursor-pointer'>
            일반인
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
