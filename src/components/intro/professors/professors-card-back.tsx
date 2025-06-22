import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

type ProfessorsCardBackProps = {
  handleCardClick: () => void;
};

export default function ProfessorsCardBack({
  handleCardClick,
}: ProfessorsCardBackProps) {
  return (
    <div className='absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden p-6 flex flex-col justify-center items-center text-center'>
      <Button onClick={handleCardClick}>
        <ExternalLink className='w-5 h-5' />
        상세 프로필 보기
      </Button>

      <p className='text-gray-500 text-sm mt-4'>외부 사이트로 이동합니다</p>
    </div>
  );
}
