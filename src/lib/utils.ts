import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 타임스탬프를 로컬 날짜 형식으로 변환
 * @param timeStamp - 타임스탬프 문자열
 * @returns 로컬 날짜 형식의 문자열
 */
export const formatTimeStamp = (timeStamp: string): string => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * 초를 분:초 형식으로 변환
 * @param seconds - 초
 * @returns 분:초 형식의 문자열
 */
export const formatTimeLeft = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

/**
 * 작품 타입이 SINGLE인지 GROUP(공동작품)인지 확인
 * @param artType
 * @returns
 */
export const getIsArtTypeSingle = (artType: 'SINGLE' | 'GROUP') => {
  return artType === 'SINGLE';
};

/**
 * 페이지 번호 배열 생성
 * @param currentPage - 현재 페이지
 * @param totalPages - 총 페이지 수
 * @param showPages - 현재 페이지 주변에 보여줄 페이지 수
 * @returns 페이지 번호 배열
 */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  showPages: number
) => {
  if (totalPages <= 1) return [1];

  // 페이지 번호 배열
  const pages: (number | 'ellipsis')[] = [];
  const start = Math.max(1, currentPage - showPages);
  const end = Math.min(totalPages, currentPage + showPages);

  // 첫 페이지 추가
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('ellipsis');
  }

  // 현재 페이지 주변 페이지들 추가
  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  // 마지막 페이지 추가
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('ellipsis');

    pages.push(totalPages);
  }

  return pages;
};
