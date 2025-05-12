import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type EmailDomainSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export default function EmailDomainSelect({
  value,
  onValueChange,
}: EmailDomainSelectProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className='w-[200px] h-[45px]'>
        <SelectValue className='h-[45px]' placeholder='선택하세요' />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value='hanyang.ac.kr'>hanyang.ac.kr</SelectItem>
        <SelectItem value='naver.com'>naver.com</SelectItem>
        <SelectItem value='gmail.com'>gmail.com</SelectItem>
        <SelectItem value='custom'>직접 입력</SelectItem>
      </SelectContent>
    </Select>
  );
}
