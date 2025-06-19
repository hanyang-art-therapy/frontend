import type { ProfessorsResponse } from '@/types/admin/professors';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ProfessorCardProps = {
  professor: ProfessorsResponse;
};

export default function ProfessorsCard({ professor }: ProfessorCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <li
          key={professor.professorNo}
          aria-label={`${professor.professorName} 교수 정보`}
          tabIndex={0}
          className='cursor-pointer group'
        >
          <div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100'>
            {/* {professor.files[0]?.url ? (
              <img
                src={professor.files[0].url}
                alt={`${professor.professorName} 교수님 프로필`}
                className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
              />
            ) : (
              <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                <span className='text-4xl text-gray-400'>👨‍🏫</span>
              </div>
            )} */}
          </div>
          <div className='mt-4 space-y-1'>
            <h3 className='text-lg font-semibold'>{professor.professorName}</h3>
            {professor.position && (
              <p className='text-sm text-gray-600'>{professor.position}</p>
            )}
            {professor.major && (
              <p className='text-sm text-gray-600'>{professor.major}</p>
            )}
          </div>
        </li>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {professor.professorName}
          </DialogTitle>
        </DialogHeader>

        <div className='flex flex-col md:flex-row gap-6 mt-4'>
          {/* <div className='relative aspect-[3/4] w-full md:w-1/3 overflow-hidden rounded-lg bg-gray-100'>
              {professor.files[0]?.url ? (
              <img
                src={professor.files[0].url}
                alt={`${professor.professorName} 교수님 프로필`}
                className='object-cover w-full h-full'
              />
            ) : (
              <div className='absolute inset-0 flex items-center justify-center bg-gray-200'>
                <span className='text-4xl text-gray-400'>👨‍🏫</span>
              </div>
            )}
          </div> */}

          <div className='flex-1 space-y-4'>
            <div className='space-y-2'>
              {professor.position && (
                <p className='text-gray-600'>
                  <span className='font-semibold'>직위:</span>{' '}
                  {professor.position}
                </p>
              )}
              {professor.major && (
                <p className='text-gray-600'>
                  <span className='font-semibold'>전공:</span> {professor.major}
                </p>
              )}
              {/* {professor.email && (
                <p className='text-gray-600'>
                  <span className='font-semibold'>이메일:</span>{' '}
                  {professor.email}
                </p>
              )}
              {professor.tel && (
                <p className='text-gray-600'>
                  <span className='font-semibold'>연락처:</span> {professor.tel}
                </p> 
              )}*/}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
