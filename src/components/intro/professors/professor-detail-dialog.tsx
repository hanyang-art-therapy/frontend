import type { ProfessorsResponse } from '@/types/admin/professors';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Mail, Phone, User, GraduationCap, Briefcase } from 'lucide-react';

type ProfessorDetailDialogProps = {
  professor: ProfessorsResponse;
  children: React.ReactNode;
};

export default function ProfessorDetailDialog({
  professor,
  children,
}: ProfessorDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='t-b-24'>
            {professor.professorName}
          </DialogTitle>
        </DialogHeader>

        <div className='flex flex-col md:flex-row gap-8 mt-6'>
          {/* 사진 영역 */}
          <div className='w-40 h-48 mx-auto md:mx-0 flex-shrink-0'>
            {professor.files?.url ? (
              <img
                src={professor.files.url}
                alt={`${professor.professorName} 교수`}
                className='w-full h-full object-cover rounded-[5px]'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-btn-gray-fa rounded-[5px]'>
                <User size={48} className='text-gray-6' />
              </div>
            )}
          </div>

          {/* 정보 영역 */}
          <div className='flex-1 space-y-6'>
            <div className='grid gap-4'>
              {professor.position && (
                <div className='flex items-start gap-3 p-4 bg-btn-gray-fa rounded-[5px]'>
                  <div className='p-2 bg-white rounded-[5px] border border-btn-gray-d'>
                    <Briefcase size={20} className='text-gray-6' />
                  </div>
                  <div>
                    <p className='t-m-14 mb-1'>직위</p>
                    <p className='t-r-16'>{professor.position}</p>
                  </div>
                </div>
              )}

              {professor.major && (
                <div className='flex items-start gap-3 p-4 bg-btn-gray-fa rounded-[5px]'>
                  <div className='p-2 bg-white rounded-[5px] border border-btn-gray-d'>
                    <GraduationCap size={20} className='text-gray-6' />
                  </div>
                  <div>
                    <p className='t-m-14 mb-1'>전공</p>
                    <p className='t-r-16'>{professor.major}</p>
                  </div>
                </div>
              )}

              {professor.email && (
                <div className='flex items-start gap-3 p-4 bg-btn-gray-fa rounded-[5px]'>
                  <div className='p-2 bg-white rounded-[5px] border border-btn-gray-d'>
                    <Mail size={20} className='text-gray-6' />
                  </div>
                  <div>
                    <p className='t-m-14 mb-1'>이메일</p>
                    <a
                      href={`mailto:${professor.email}`}
                      className='t-r-16 text-success hover:underline transition-colors'
                    >
                      {professor.email}
                    </a>
                  </div>
                </div>
              )}

              {professor.tel && (
                <div className='flex items-start gap-3 p-4 bg-btn-gray-fa rounded-[5px]'>
                  <div className='p-2 bg-white rounded-[5px] border border-btn-gray-d'>
                    <Phone size={20} className='text-gray-6' />
                  </div>
                  <div>
                    <p className='t-m-14 mb-1'>연락처</p>
                    <a
                      href={`tel:${professor.tel}`}
                      className='t-r-16 text-success hover:underline transition-colors'
                    >
                      {professor.tel}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
