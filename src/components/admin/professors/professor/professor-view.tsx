import { useEffect, useState } from 'react';
import {
  ProfessorResponse,
  PatchProfessorRequest,
} from '@/types/admin/professors';
import {
  getProfessors,
  patchProfessor,
  deleteProfessor,
} from '@/apis/admin/professors';
import ProfessorModal from '@/components/admin/professors/professor/professor-modal';

export default function ProfessorView() {
  const [professors, setProfessors] = useState<ProfessorResponse[]>([]);
  const [selectedProfessors, setSelectedProfessors] =
    useState<ProfessorResponse | null>(null);

  useEffect(() => {
    getProfessors().then(setProfessors);
  }, []);

  const handleEdit = async (form: PatchProfessorRequest) => {
    await patchProfessor(form.professorNo, form);
    await getProfessors().then(setProfessors);
    setSelectedProfessors(null);
  };

  const handleDelete = async (professorNo: number) => {
    await deleteProfessor(professorNo);
    await getProfessors().then(setProfessors);
    setSelectedProfessors(null);
  };

  const handleClose = () => setSelectedProfessors(null);

  return (
    <>
      <div className='max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
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
            <div className='min-h-[44px] flex items-center justify-center'>
              {prof.professorName || '-'}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {prof.position || '-'}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {prof.major || '-'}
            </div>
          </div>
        ))}
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
