import type { ProfessorsResponse } from '@/types/admin/professors';
import { User, GraduationCap, Briefcase } from 'lucide-react';
import ProfessorDetailDialog from './professor-detail-dialog';

type ProfessorCardProps = {
  professor: ProfessorsResponse;
};

export default function ProfessorsCard({ professor }: ProfessorCardProps) {
  return (
    <ProfessorDetailDialog professor={professor}>
      <li
        key={professor.professorNo}
        aria-label={`${professor.professorName} 교수 정보`}
        tabIndex={0}
        className='cursor-pointer group p-6 bg-white rounded-[5px] border border-btn-gray-d hover:border-primary hover:shadow-lg transition-all duration-300'
      >
        <div className='flex items-start gap-4'>
          <div className='relative w-20 h-24 flex-shrink-0 overflow-hidden rounded-[5px]'>
            {professor.files?.url ? (
              <img
                src={professor.files.url}
                alt={`${professor.professorName} 교수`}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center text-gray-6'>
                <User size={24} />
              </div>
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <h3 className='t-m-18 mb-1 group-hover:text-primary transition-colors'>
              {professor.professorName}
            </h3>

            <div className='space-y-1'>
              {professor.position && (
                <div className='flex items-center gap-1.5 text-gray-6'>
                  <Briefcase size={14} className='flex-shrink-0' />
                  <span className='t-r-14 truncate'>{professor.position}</span>
                </div>
              )}
              {professor.major && (
                <div className='flex items-center gap-1.5 text-gray-6'>
                  <GraduationCap size={14} className='flex-shrink-0' />
                  <span className='t-r-14 truncate'>{professor.major}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </li>
    </ProfessorDetailDialog>
  );
}
