import { Professor, Files } from '@/types';

// [GET] 조회 및 상세조회
export type ProfessorResponse = Professor & {
  files: Pick<Files, 'filesNo' | 'name' | 'url'> | null;
};

// [PATCH] 수정 요청
export type PatchProfessorRequest = Pick<
  Professor,
  'professorNo' | 'professorName' | 'position' | 'major' | 'email' | 'tel'
> &
  Pick<Files, 'filesNo'>;

// [DELETE] 삭제 요청
export type DeleteProfessorRequest = {
  professorNo: number;
};

// [POST] 등록 요청
export type PostProfessorRequest = Pick<
  Professor,
  'professorName' | 'position' | 'major' | 'email' | 'tel'
> &
  Pick<Files, 'filesNo'>;
