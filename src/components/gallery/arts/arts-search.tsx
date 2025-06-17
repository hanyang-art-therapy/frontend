import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GalleryLoaderData } from '@/routes/loaders/gallery/gallery-loader';
import type { Dispatch, SetStateAction } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

type ArtsSearchProps = {
  setLastId: Dispatch<SetStateAction<number>>;
};

export default function ArtsSearch({ setLastId }: ArtsSearchProps) {
  const { yearsResponse, cohortsResponse } = useLoaderData<GalleryLoaderData>();

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
      prevSearchParams.set('year', year);

      return prevSearchParams;
    });
  };

  return (
    <div className='flex gap-4 mr-auto'>
      <Select
        value={selectedCohort}
        onValueChange={(value) => handleCohortChange(value)}
      >
        <SelectTrigger className='px-4 py-2 border rounded mr-auto mt-[30px]'>
          <SelectValue placeholder='전체 기수' />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value='all'>전체 기수</SelectItem>
          {cohortsResponse.cohorts.map((cohort: number) => (
            <SelectItem key={cohort} value={cohort.toString()}>
              {cohort}기
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedYear}
        onValueChange={(value) => handleYearChange(value)}
      >
        <SelectTrigger className='px-4 py-2 border rounded mr-auto mt-[30px]'>
          <SelectValue placeholder='전체 연도' />
        </SelectTrigger>

        <SelectContent>
          {yearsResponse.years.map((year: number) => (
            <SelectItem key={year} value={year.toString()}>
              {year}년
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
