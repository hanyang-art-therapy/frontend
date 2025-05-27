import type { ProfessorResponse } from '@/types/admin/professor';
import { Mail, Phone } from 'lucide-react';

export default function ProfessorsCartFront({
  ...professor
}: ProfessorResponse) {
  const { professorName, position, major, email, tel, files } = professor;
  const profileImage =
    files?.[0]?.url || '/placeholder.svg?height=200&width=200';

  return (
    <div className='absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden'>
      <div className='flex h-full'>
        <div className='sm:w-[140px] w-[100px] flex-shrink-0'>
          <img
            src={profileImage}
            alt={`${professorName} 교수`}
            className='sm:w-[140px] sm:h-[180px] w-[100px] h-[140px] object-cover'
          />
        </div>

        <div className='flex-1 p-3 md:p-4 flex flex-col space-y-2'>
          <h3 className='t-b-18 line-clamp-2'>{professorName}</h3>
          <p className='t-r-14 line-clamp-1'>{position}</p>
          {major && <p className='t-r-14 line-clamp-2 mb-2'>{major}</p>}

          <div className='space-y-1 t-r-14'>
            {email && (
              <div className='flex items-center gap-2 text-gray-6 underline'>
                <Mail className='w-3 h-3 md:w-4 md:h-4 flex-shrink-0' />
                <a href={`mailto:${email}`} className='truncate'>
                  {email}
                </a>
              </div>
            )}
            {tel && (
              <div className='flex items-center gap-2 text-gray-6 underline'>
                <Phone className='w-3 h-3 md:w-4 md:h-4 flex-shrink-0' />
                <a href={`tel:${tel}`} className='truncate'>
                  {tel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
