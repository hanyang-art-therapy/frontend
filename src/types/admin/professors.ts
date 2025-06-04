import { Professor, Files } from '@/types';

export type PostProfessorRequest = Pick<
  Professor,
  'professorName' | 'position' | 'major' | 'email' | 'tel'
> &
  Pick<Files, 'filesNo'>;

export type ProfessorResponse = Pick<
  Professor,
  'professorNo' | 'professorName' | 'position' | 'major' | 'email' | 'tel'
> & { files: Pick<Files, 'filesNo' | 'url'>[] };

export type PatchProfessorRequest = PostProfessorRequest &
  Pick<Professor, 'professorNo'>;
