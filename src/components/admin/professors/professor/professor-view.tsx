import { useEffect, useState } from 'react';
import {
  ProfessorsResponse,
  ProfessorResponse,
  PatchProfessorRequest,
} from '@/types/admin/professors';
import { MessageResponse } from '@/types';
import {
  getProfessors,
  patchProfessor,
  deleteProfessor,
} from '@/apis/admin/professors';
import ProfessorModal from '@/components/admin/professors/professor/professor-modal';
import { handleApiError } from '@/components/common/error-handler';
import { toast } from 'sonner';

export default function ProfessorView() {
  const [professors, setProfessors] = useState<ProfessorsResponse[]>([]);
  const [selectedProfessors, setSelectedProfessors] =
    useState<ProfessorsResponse | null>(null);

  useEffect(() => {
    getProfessors()
      .then(setProfessors)
      .catch((error) => {
        toast.error(handleApiError(error));
      });
  }, []);

  const handleEdit = async (
    form: PatchProfessorRequest
  ): Promise<MessageResponse> => {
    const { professorNo, professorName, position, major, email, tel, filesNo } =
      form;
    const res = await patchProfessor(professorNo, {
      professorName,
      position,
      major,
      email,
      tel,
      filesNo,
    });

    await getProfessors().then((professors) => setProfessors(professors));
    setSelectedProfessors(null);

    return res;
  };

  const handleDelete = async (
    professorNo: number
  ): Promise<MessageResponse> => {
    const res = await deleteProfessor(professorNo);

    await getProfessors().then((professors) => setProfessors(professors));
    setSelectedProfessors(null);

    return res;
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
        <ProfessorModal
          professor={selectedProfessors}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
}
