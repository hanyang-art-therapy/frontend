import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EMAIL_DOMAIN_SELECT_OPTIONS } from '@/constants/common/common';

type EmailDomainSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
};

export default function EmailDomainSelect({
  value,
  onValueChange,
  disabled,
}: EmailDomainSelectProps) {
  return (
    <Select
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
      name='emailDomain'
    >
      <SelectTrigger className='w-[200px] h-[45px]'>
        <SelectValue className='h-[45px]' placeholder='선택하세요' />
      </SelectTrigger>

      <SelectContent>
        {EMAIL_DOMAIN_SELECT_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}

        <SelectItem key='custom' value='custom'>
          직접 입력
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
