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

export default function ArtistView() {
  const [professors, setProfessors] = useState<ProfessorResponse[]>([]);
  const [selectedProfessors, setSelectedProfessors] =
    useState<ProfessorResponse | null>(null);

  useEffect(() => {
    getProfessors().then((artists) => setProfessors(artists));
  }, []);

  const handleEdit = async (form: PatchProfessorRequest) => {
    await patchProfessor(form.professorNo, form);
    const professors = await getProfessors();
    setProfessors(professors);
    setSelectedProfessors(null);
  };

  const handleDelete = async (professorNo: number) => {
    await deleteProfessor(professorNo);
    await getProfessors().then((professors) => setProfessors(professors));
    setSelectedProfessors(null);
  };

  const handleClose = () => setSelectedProfessors(null);

  return (
    <>
      <div className='max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {/* 교수진 목록 헤더 */}
        <div className='sticky top-0 z-1 grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-b-14 text-nowrap bg-bg-gray-fa'>
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
        {professors.map((professors, i) => (
          <div
            key={professors.professorNo}
            onClick={() => setSelectedProfessors(professors)}
            className='grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {i + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {professors.professorName}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {professors.position}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {professors.major}
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
