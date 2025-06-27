import { LoaderCircle } from 'lucide-react';

export default function DialogLoading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <LoaderCircle className='sm:h-24 sm:w-24 h-12 w-12 animate-spin text-primary' />
    </div>
  );
}
