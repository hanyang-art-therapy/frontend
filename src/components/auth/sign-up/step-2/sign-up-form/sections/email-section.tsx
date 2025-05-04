import { Input } from '@/components/ui/input';
import Required from '@/components/ui/required';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SignUpFormValues } from '@/schemas/sign-up/sign-up-schema';
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export default function EmailSection({
  register,
  setValue,
  watch,
  selectedDomain,
  setSelectedDomain,
}: {
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  watch: UseFormWatch<SignUpFormValues>;
  selectedDomain: string;
  setSelectedDomain: (value: string) => void;
}) {
  const isCustomDomain = selectedDomain === 'custom';
  const watchEmailDomain = watch('emailDomain');
  const domainValue = isCustomDomain ? watchEmailDomain : selectedDomain;

  const handleEmailDomainChange = (value: string) => {
    setSelectedDomain(value);

    if (value !== 'custom') {
      setValue('emailDomain', value);
    } else {
      setValue('emailDomain', '');
    }
  };

  return (
    <div className='py-[20px] space-y-2.5 border-b border-bg-gray'>
      <label className='title-b-16 flex items-center'>
        이메일 <Required />
      </label>
      <div className='flex items-center gap-[30px]'>
        <div className='flex gap-2.5 h-[45px] items-center'>
          {/* 이메일 ID */}
          <Input
            {...register('emailId')}
            className='w-[200px] h-full'
            placeholder='이메일 아이디를 입력해주세요.'
          />

          {/* @ */}
          <span className='text-r-16'>@</span>

          {/* 이메일 도메인 */}
          <Input
            {...register('emailDomain')}
            className='w-[200px] h-full'
            placeholder='직접 입력'
            value={domainValue}
            onChange={(e) => setValue('emailDomain', e.target.value)}
            disabled={selectedDomain !== 'custom' && selectedDomain !== ''}
          />

          {/* 이메일 도메인 선택 */}
          <Select onValueChange={handleEmailDomainChange}>
            <SelectTrigger className='w-[200px] h-[45px]'>
              <SelectValue className='h-[45px]' placeholder='선택하세요' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='gmail.com'>gmail.com</SelectItem>
              <SelectItem value='naver.com'>naver.com</SelectItem>
              <SelectItem value='daum.net'>daum.net</SelectItem>
              <SelectItem value='custom'>직접 입력</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
