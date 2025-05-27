import { getProfessors } from '@/apis/admin/professor';
import type { ProfessorResponse } from '@/types/admin/professor';
import { useEffect, useState } from 'react';
import ProfessorsCard from './professors-card';

export default function ProfessorsContent() {
  const [professors, setProfessors] = useState<ProfessorResponse[]>([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      const response = await getProfessors();
      setProfessors(response);
    };

    fetchProfessors();
  }, []);

  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[8vw] sm:gap-[4vw]'>
      {professors.map((professor) => {
        return (
          <ProfessorsCard key={professor.professorNo} professor={professor} />
        );
      })}
    </ul>
  );
}
