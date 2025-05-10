import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Art } from '@/types/gallery/art';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

type ArtsSearchProps = {
  arts: Art[];
  setFilteredArts: Dispatch<SetStateAction<Art[]>>;
};

export default function ArtsSearch({ arts, setFilteredArts }: ArtsSearchProps) {
  const [selectedYear, setSelectedYear] = useState<string>();
  const [selectedCohort, setSelectedCohort] = useState<string>();

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleCohortChange = (value: string) => {
    setSelectedCohort(value);
  };

  useEffect(() => {
    let result = arts;

    // 최초 기본 값 (undefined)
    if (!selectedYear && !selectedCohort) {
      setFilteredArts(arts);
      return;
    }

    // 기수 검색 (전체 제외)
    if (selectedCohort !== 'all') {
      result = result.filter(
        (art) => art.artist.cohort === Number(selectedCohort)
      );
    }

    // if (selectedYear !== 'all') {
    //   result = result.filter(
    //     (art) =>
    //       new Date(art.createdAt).getFullYear().toString() === selectedYear
    //   );
    // }

    setFilteredArts(result);
  }, [selectedCohort, selectedYear]);

  return (
    <div className='pt-[30px] gap-[23px] flex justify-start w-full md:max-w-full max-w-[300px]'>
      <Select value={selectedCohort} onValueChange={handleCohortChange}>
        <SelectTrigger>
          <SelectValue placeholder='기수별' defaultValue='all' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>전체 기수</SelectItem>
          <SelectItem value='25'>25기</SelectItem>
          <SelectItem value='30'>30기</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedYear} onValueChange={handleYearChange}>
        <SelectTrigger>
          <SelectValue placeholder='2025' defaultValue='2025' />
        </SelectTrigger>

        <SelectContent className='max-w-[50px]'>
          <SelectItem value='all'>전체 연도</SelectItem>
          <SelectItem value='2024'>2024</SelectItem>
          <SelectItem value='2025'>2025</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
