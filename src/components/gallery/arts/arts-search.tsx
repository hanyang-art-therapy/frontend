import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

type ArtsSearchProps = {
  cohorts: number[];
  setLastId: Dispatch<SetStateAction<number>>;
};

export default function ArtsSearch({ cohorts, setLastId }: ArtsSearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentYear = new Date().getFullYear().toString();
  const selectedCohort = searchParams.get('cohort') ?? 'all';
  const selectedYear = searchParams.get('year') ?? currentYear;

  const handleCohortChange = async (cohort: string) => {
    setLastId(0);
    setSearchParams((prevSearchParams) => {
      if (cohort === 'all') prevSearchParams.delete('cohort');
      else prevSearchParams.set('cohort', cohort);

      return prevSearchParams;
    });
  };

  const handleYearChange = async (year: string) => {
    setSearchParams((prevSearchParams) => {
      if (year === 'all') prevSearchParams.delete('year');
      else prevSearchParams.set('year', year);

      return prevSearchParams;
    });
  };

  return (
    <div className='flex gap-4 mr-auto'>
      <Select
        value={selectedCohort}
        onValueChange={(value) => handleCohortChange(value)}>
        <SelectTrigger className='px-4 py-2 border rounded mr-auto mt-[30px]'>
          <SelectValue placeholder='전체 기수' />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value='all'>전체 기수</SelectItem>
          {cohorts.map((cohort) => (
            <SelectItem key={cohort} value={cohort.toString()}>
              {cohort}기
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedYear}
        onValueChange={(value) => handleYearChange(value)}>
        <SelectTrigger className='px-4 py-2 border rounded mr-auto mt-[30px]'>
          <SelectValue defaultValue='2025' />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value='2025'>2025</SelectItem>
          <SelectItem value='2024'>2024</SelectItem>
          <SelectItem value='2023'>2023</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
