import SignUpProgress from '@/components/auth/sign-up/sign-up-progress';
import SignUpStep1 from '@/components/auth/sign-up/step-1/sign-up-step-1';
import { lazy, Suspense, useState } from 'react';

const SignUpStep2 = lazy(
  () => import('@/components/auth/sign-up/step-2/sign-up-step-2')
);

const SignUpStep3 = lazy(
  () => import('@/components/auth/sign-up/step-3/sign-up-step-3')
);

export default function SignUp() {
  const [progress, setProgress] = useState(1);

  return (
    <>
      <SignUpProgress progress={progress} />

      <div className='w-full flex justify-center max-w-[1080px] mx-auto'>
        {progress === 1 && <SignUpStep1 setProgress={setProgress} />}

        <Suspense fallback={<div>Loading...</div>}>
          {progress === 2 && <SignUpStep2 setProgress={setProgress} />}
          {progress === 3 && <SignUpStep3 />}
        </Suspense>
      </div>
    </>
  );
}
