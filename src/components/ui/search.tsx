import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import {
  useRef,
  type KeyboardEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';

type SearchProps = {
  placeholder: string;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
  className?: string;
};

/**
 * 검색 컴포넌트
 * @param placeholder 검색 플레이스홀더 (String)
 * @param searchValue 검색 값 (String)
 * @param setSearchValue 검색 값 설정 핸들러 (Function)
 * @param onSearch 검색 핸들러 (Function)
 * @param className 추가 클래스명 (String | undefined)
 * @returns 검색 컴포넌트
 */
export default function Search({
  placeholder,
  searchValue,
  setSearchValue,
  onSearch,
  className,
}: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearch();
    inputRef.current?.blur();
  };

  const handleBlur = () => handleSearch();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter' || e.shiftKey) return;

    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='relative w-full'>
      <Input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className={cn('h-[45px] px-[16px] py-[12px] t-r-16 w-full', className)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />

      <Button
        variant='ghost'
        className='absolute right-1 w-10 h-10 top-1/2 -translate-y-1/2'
        onClick={handleSearch}
        type='button'
      >
        <SearchIcon className='text-gray-9' size={40} />
      </Button>
    </div>
  );
}
