import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';

export default function ArtsSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCohort = searchParams.get('cohort') ?? 'all';

  const handleCohortChange = (cohort: string) => {
    setSearchParams((prevSearchParams) => {
      if (cohort === 'all') prevSearchParams.delete('cohort');
      else prevSearchParams.set('cohort', cohort);

      return prevSearchParams;
    });
  };

  return (
    <Select
      value={selectedCohort}
      onValueChange={(value) => handleCohortChange(value)}>
      <SelectTrigger className='px-4 py-2 border rounded mr-auto mt-[30px]'>
        <SelectValue placeholder='전체 기수' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>전체 기수</SelectItem>
        <SelectItem value='25'>25기</SelectItem>
        <SelectItem value='27'>27기</SelectItem>
        <SelectItem value='29'>29기</SelectItem>
        <SelectItem value='30'>30기</SelectItem>
        <SelectItem value='31'>31기</SelectItem>
        <SelectItem value='32'>32기</SelectItem>
        <SelectItem value='33'>33기</SelectItem>
      </SelectContent>
    </Select>
  );
}
