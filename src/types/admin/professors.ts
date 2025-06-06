import { Professor } from '@/types';

// [GET] 조회 및 상세조회
export type ProfessorResponse = Pick<
  Professor,
  'professorNo' | 'professorName' | 'position' | 'major' | 'email' | 'tel'
> & {
  files: {
    filesNo: number;
    url: string;
  };
};

// [PATCH] 수정 요청
export type PatchProfessorRequest = Pick<
  Professor,
  'professorNo' | 'professorName' | 'position' | 'major' | 'email' | 'tel'
> & {
  filesNo: number;
};

// [DELETE] 삭제 요청
export type DeleteProfessorRequest = Pick<Professor, 'professorNo'>;

// [POST] 등록 요청
export type PostProfessorRequest = Pick<
  Professor,
  'professorNo' | 'professorName' | 'position' | 'major' | 'email' | 'tel'
> & {
  files: {
    url: string;
  };
};
