import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ProfessorsResponse } from '@/types/admin/professors';
import { Mail, Phone, User } from 'lucide-react';

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

      <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <div className='space-y-12'>
          <div className='flex items-start gap-6 rounded-[5px]'>
            <div className='relative'>
              <div className='w-24 h-28 sm:w-28 sm:h-32 rounded-[5px] overflow-hidden border border-bg-gray-d'>
                {professor.files?.url ? (
                  <img
                    src={professor.files.url}
                    alt={`${professor.professorName} 사진`}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center bg-white'>
                    <User size={32} className='text-gray-6' />
                  </div>
                )}
              </div>
            </div>

            <div className='flex-1'>
              <span className='t-b-24 mb-2'>{professor.professorName}</span>
              {professor.position && (
                <p className='t-m-18 text-gray-6 mb-1'> {professor.position}</p>
              )}
              {professor.major && (
                <p className='t-r-14 text-gray-6'>{professor.major}</p>
              )}
            </div>
          </div>

          {(professor.email || professor.tel) && (
            <div className='space-y-3'>
              <span className='t-b-18 mb-3 flex items-center gap-2'>
                <div className='w-1 h-4 bg-primary rounded-full'></div>
                연락처 정보
              </span>

              <div className='grid gap-3'>
                {professor.email && (
                  <div className='group'>
                    <a
                      href={`mailto:${professor.email}`}
                      className='flex items-center gap-3 p-4 bg-white border border-bg-gray-d rounded-[5px] hover:border-primary hover:shadow-sm transition-all duration-200'
                    >
                      <div className='p-2 bg-primary/10 rounded-[5px] group-hover:bg-primary/20 transition-colors'>
                        <Mail size={16} className='text-primary' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='t-r-14 mb-1'>이메일</p>
                        <p className='t-m-16 truncate'>{professor.email}</p>
                      </div>
                    </a>
                  </div>
                )}

                {professor.tel && (
                  <div className='group'>
                    <a
                      href={`tel:${professor.tel}`}
                      className='flex items-center gap-3 p-4 bg-white border border-bg-gray-d rounded-[5px] hover:border-primary transition-all duration-200'
                    >
                      <div className='p-2 bg-primary/10 rounded-[5px] group-hover:bg-primary/20 transition-colors'>
                        <Phone size={16} className='text-primary' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='t-r-14 mb-1'>연락처</p>
                        <p className='t-m-16'>{professor.tel}</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
