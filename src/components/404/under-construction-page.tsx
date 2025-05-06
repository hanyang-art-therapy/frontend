// UnderConstructionPage.tsx
import React from 'react';

const UnderConstructionPage: React.FC = () => {
  return (
    <div className='h-screen bg-[var(--color-bg-gray)] flex items-center justify-center'>
      <div className='bg-white rounded-lg p-10 shadow-xl w-full max-w-[1080px] text-center'>
        <h1 className='text-4xl font-semibold text-primary mb-4'>
          준비 중입니다
        </h1>
        <p className='text-lg text-gray-600 mb-6'>
          현재 페이지는 개발 중입니다. 잠시만 기다려 주세요!
        </p>
        <div className='text-3xl animate-bounce'>🚧</div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;
