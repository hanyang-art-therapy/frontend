// STEP 2: 회원정보 입력 및 본인인증

import { Dispatch, SetStateAction, useEffect } from 'react';
import SignUpForm from '@/components/auth/sign-up/step-2/form/sign-up-form';
import SignUpFormIntro from '@/components/auth/sign-up/step-2/form/sign-up-form-intro';

export default function SignUpStep2({
  setProgress,
}: {
  setProgress: Dispatch<SetStateAction<number>>;
}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='flex w-full flex-col gap-[10px]'>
      <section className='space-y-4 w-full'>
        <SignUpFormIntro />
      </section>

      <section className='border-t border-bg-gray'>
        <SignUpForm setProgress={setProgress} />
      </section>
    </div>
  );
}
