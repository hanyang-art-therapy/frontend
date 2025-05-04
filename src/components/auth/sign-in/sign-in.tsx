import SignInBanner from '@/components/auth/sign-in/sign-in-banner';
import SignInContent from '@/components/auth/sign-in/sign-in-content';

export default function SignIn() {
  return (
    <div>
      <SignInBanner />
      <div className='flex flex-col items-center justify-center md:max-w-[380px] mx-auto'>
        <SignInContent />
      </div>
    </div>
  );
}
