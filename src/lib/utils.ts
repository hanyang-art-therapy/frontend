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

export const formatTimeLeft = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

export const getIsArtTypeSingle = (artType: 'SINGLE' | 'GROUP') => {
  return artType === 'SINGLE';
};
