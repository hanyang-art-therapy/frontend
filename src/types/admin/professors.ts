import { Professor } from '@/types';

// [GET] 조회 및 상세조회
export type ProfessorsResponse = Pick<
  Professor,
  'professorNo' | 'professorName' | 'position' | 'major' | 'email' | 'tel'
> & {
  files: {
    url: string | null;
  };
};

// [PATCH] 수정 요청
export type PatchProfessorRequest = Pick<
  Professor,
  'professorNo' | 'professorName' | 'position' | 'major' | 'email' | 'tel'
> & {
  filesNo?: number | null;
};

// [POST] 등록 요청
export type PostProfessorRequest = Pick<
  Professor,
  'professorName' | 'position' | 'major' | 'email' | 'tel'
> & {
  filesNo: number | null;
};
