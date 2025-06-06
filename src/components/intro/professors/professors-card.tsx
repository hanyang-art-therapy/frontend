import type { ProfessorResponse } from '@/types/admin/professors';
import { cn } from '@/lib/utils';
import ProfessorsCartFront from './professors-cart-front';
import ProfessorsCardBack from './professors-card-back';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type ProfessorsCardProps = {
  professor: ProfessorResponse;
};

export default function ProfessorsCard({ professor }: ProfessorsCardProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const isFlipped = flippedCard === professor.professorNo;
  const navigate = useNavigate();

  const handleMouseEnter = (id: number) => {
    setFlippedCard(id);
  };

  const handleMouseLeave = () => {
    setFlippedCard(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const handleCardClick = () => {
    navigate(
      'https://gsic.hanyang.ac.kr/front/department-intro/art-therapy/art-therapy-prof'
    );
  };

  return (
    <li
      key={professor.professorNo}
      role='button'
      aria-label={`${professor.professorName} 교수 정보 카드`}
      tabIndex={0}
      className='relative h-[140px] sm:h-[180px] [perspective:1000px] cursor-pointer group'
      onClick={handleCardClick}
      onMouseEnter={() => handleMouseEnter(professor.professorNo)}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] box-shadow-style rounded-xl',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
      >
        <ProfessorsCartFront {...professor} />
        <ProfessorsCardBack handleCardClick={handleCardClick} />
      </div>
    </li>
  );
}
