import type { ProfessorsResponse } from '@/types/admin/professors';
import ProfessorsCard from './professors-card';

type ProfessorsContentProps = {
  professors: ProfessorsResponse[];
};

export default function ProfessorsContent({
  professors,
}: ProfessorsContentProps) {
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
