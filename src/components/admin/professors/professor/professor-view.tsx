import {
  deleteProfessor,
  getProfessors,
  patchProfessor,
} from '@/apis/admin/professors';
import {
  deleteProfessorTest,
  getProfessorsTest,
  patchProfessorTest,
} from '@/apis/admin/tester/professors';
import DialogLoading from '@/components/ui/dialog-loading';
import { useAuthStore } from '@/store/auth';
import { MessageResponse } from '@/types';
import type {
  PatchProfessorRequest,
  ProfessorsResponse,
} from '@/types/admin/professors';
import { Dispatch, SetStateAction, Suspense, lazy, useState } from 'react';

const ProfessorModal = lazy(
  () => import('@/components/admin/professors/professor/professor-modal')
);

type Props = {
  professors: ProfessorsResponse[];
  setProfessors: Dispatch<SetStateAction<ProfessorsResponse[]>>;
};

export default function ProfessorView({ professors, setProfessors }: Props) {
  const { role } = useAuthStore();
  const [selectedProfessors, setSelectedProfessors] =
    useState<ProfessorsResponse | null>(null);

  const handleEdit = async (
    form: PatchProfessorRequest
  ): Promise<MessageResponse> => {
    const { professorNo, professorName, position, major, email, tel, filesNo } =
      form;

    let response;

    if (role === 'TESTER') {
      response = await patchProfessorTest(professorNo, {
        professorName,
        position,
        major,
        email,
        tel,
        filesNo,
      });
      await getProfessorsTest().then((professors) => setProfessors(professors));
    } else {
      response = await patchProfessor(professorNo, {
        professorName,
        position,
        major,
        email,
        tel,
        filesNo,
      });
      await getProfessors().then((professors) => setProfessors(professors));
    }

    setSelectedProfessors(null);

    return response;
  };

  const handleDelete = async (
    professorNo: number
  ): Promise<MessageResponse> => {
    let response;

    if (role === 'TESTER') {
      response = await deleteProfessorTest(professorNo);
      await getProfessorsTest().then((professors) => setProfessors(professors));
    } else {
      response = await deleteProfessor(professorNo);
      await getProfessors().then((professors) => setProfessors(professors));
    }

    setSelectedProfessors(null);

    return response;
  };

  const handleClose = () => setSelectedProfessors(null);

  return (
    <>
      <div className='max-h-[100vw] md:max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        <div className='sticky top-0 z-1 grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-b-14 text-nowrap bg-bg-gray-fa'>
          {/* 교수진 타이틀 */}
          <div className='min-h-[44px] flex items-center justify-center'>
            No.
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            이름
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            직위
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            전공
          </div>
        </div>
        {/* 교수진 목록 */}
        {professors.map((prof, index) => (
          <div
            key={prof.professorNo}
            onClick={() => setSelectedProfessors(prof)}
            className='grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {index + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {prof.professorName || '-'}
              </span>
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {prof.position || '-'}
              </span>
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {prof.major || '-'}
              </span>
            </div>
          </div>
        ))}
        <div className='w-full h-1 bg-bg-gray-fa' />
      </div>

      {/* 교수진 상세 모달 */}
      {selectedProfessors && (
        <Suspense fallback={<DialogLoading />}>
          <ProfessorModal
            role={role}
            professor={selectedProfessors}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClose={handleClose}
          />
        </Suspense>
      )}
    </>
  );
}
