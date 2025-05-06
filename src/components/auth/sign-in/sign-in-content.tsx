import SignInForm from './sign-in-form';

export default function SignInContent() {
  return (
    <div className='flex flex-col items-center justify-center mt-[30px] md:mt-[60px] gap-[50px] w-full'>
      <h2 className='text-[32px] font-bold tracking-[0.32px]'>LOGIN</h2>
      <SignInForm />
    </div>
  );
}
