import SignUpProgress from '@/components/auth/sign-up/sign-up-progress';
import SignUpStep1 from '@/components/auth/sign-up/step-1/sign-up-step-1';
import SignUpSkeleton from '@/components/auth/sign-up/sign-up-skeleton';
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

      <div className='w-full flex justify-center max-w-[1080px] mx-auto px-4 md:px-0'>
        {progress === 1 && <SignUpStep1 setProgress={setProgress} />}

        <Suspense fallback={<SignUpSkeleton />}>
          {progress === 2 && <SignUpStep2 setProgress={setProgress} />}
        </Suspense>

        {progress === 3 && <SignUpStep3 />}
      </div>
    </>
  );
}
