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

/**
 * 비밀번호 유효성 검사
 * @param password - 비밀번호 문자열
 * @returns 유효한 비밀번호인 경우 true, 유효하지 않은 경우 false
 */
export const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{10,}$/;

  return regex.test(password);
};

export const getIsArtTypeSingle = (artType: 'SINGLE' | 'GROUP') => {
  return artType === 'SINGLE';
};
